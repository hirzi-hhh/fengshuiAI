import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  Text,
} from 'react-native';
import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';

import { styles } from './styles';
import InputScreen from './screens/InputScreen';
import DesignPlanScreen from './screens/ResultsScreen'; // Renamed for clarity

// --- Configuration ---
const API_BASE_URL = 'http://172.30.1.90:3000';
const API_ENDPOINT = `${API_BASE_URL}/api/v1/generate-design`;

// --- Main App Component ---
export default function App() {
  // --- State Management ---
  const [currentStep, setCurrentStep] = useState(1); // 1: Input, 2: Loading, 3: Results
  const [image, setImage] = useState(null);
  const [stylePreference, setStylePreference] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [budget, setBudget] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [designPlan, setDesignPlan] = useState(null);

  // --- Permissions ---
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  // --- Image Handling ---
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // --- API Call ---
  const handleGeneratePress = async () => {
    if (!image || !stylePreference) {
      setError('Please select an image and enter a style.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCurrentStep(2);

    const formData = new FormData();
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('roomImage', { uri: image, name: `photo.${fileType}`, type: `image/${fileType}` });
    formData.append('style', stylePreference);
    formData.append('colorPalette', colorPalette);
    formData.append('budget', budget);

    try {
      const response = await fetch(API_ENDPOINT, { method: 'POST', body: formData, headers: { 'Content-Type': 'multipart/form-data' } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'An unknown error occurred.');
      setDesignPlan(data.designPlan);
      setCurrentStep(3);
    } catch (e) {
      setError(`Failed to connect to the AI backend: ${e.message}`);
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Navigation & Actions ---
  const handleShopLinkPress = (url) => {
    Linking.openURL(url);
  };
  
  const resetState = () => {
    setCurrentStep(1);
    setImage(null);
    setStylePreference('');
    setColorPalette('');
    setBudget('');
    setError(null);
    setDesignPlan(null);
  };

  // --- UI Rendering ---
  const renderCurrentStep = () => {
    if (isLoading || currentStep === 2) {
      return (
        <View style={styles.stepContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Your AI consultant is thinking...</Text>
        </View>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <InputScreen
            error={error}
            image={image}
            takePicture={takePicture}
            pickImage={pickImage}
            stylePreference={stylePreference}
            setStylePreference={setStylePreference}
            colorPalette={colorPalette}
            setColorPalette={setColorPalette}
            budget={budget}
            setBudget={setBudget}
            handleGeneratePress={handleGeneratePress}
          />
        );
      case 3:
        return (
          <DesignPlanScreen
            designPlan={designPlan}
            handleShopLinkPress={handleShopLinkPress}
            resetState={resetState}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {renderCurrentStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
