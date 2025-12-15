
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// --- Configuration ---
// IMPORTANT: Replace '192.168.1.100' with your computer's actual local IP address.
const API_BASE_URL = 'http://172.30.1.90:3000';
const API_ENDPOINT = `${API_BASE_URL}/api/v1/generate-design`;

// --- Main App Component ---
export default function App() {
  // --- State Management ---
  const [currentStep, setCurrentStep] = useState(1); // 1: Input, 2: Loading, 3: Results
  const [stylePreference, setStylePreference] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [budget, setBudget] = useState('');
  const [refinementText, setRefinementText] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDesigns, setGeneratedDesigns] = useState([]);

  // --- API Call ---
  const handleGeneratePress = async () => {
    if (!stylePreference) {
      setError('Please enter a style preference to begin.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentStep(2); // Move to loading screen

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          style: stylePreference,
          // In a real app, you'd also send colorPalette and budget
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An unknown error occurred on the server.');
      }

      // Assuming the backend returns an array of design objects
      // For this example, we'll use placeholder data as the backend is mocked
      setGeneratedDesigns([
        { id: 1, name: `Concept 1: ${stylePreference}`, imageUrl: 'https://via.placeholder.com/400/CCCCCC/FFFFFF?text=Generated+Image+1' },
        { id: 2, name: `Concept 2: ${stylePreference}`, imageUrl: 'https://via.placeholder.com/400/DDDDDD/FFFFFF?text=Generated+Image+2' },
        { id: 3, name: `Concept 3: ${stylePreference}`, imageUrl: 'https://via.placeholder.com/400/EEEEEE/FFFFFF?text=Generated+Image+3' },
      ]);
      setCurrentStep(3); // Move to results screen

    } catch (e) {
      setError(`Failed to connect to the AI backend: ${e.message}`);
      setCurrentStep(1); // Go back to input screen on error
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI Rendering ---

  const renderInputScreen = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>FENGSHUI AI: Room Redesign</Text>
      <Text style={styles.subtitle}>Step 1: Capture & Define</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Style (e.g., Industrial, Cottagecore)"
        value={stylePreference}
        onChangeText={setStylePreference}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Color Palette (e.g., Warm Tones, Earthy)"
        value={colorPalette}
        onChangeText={setColorPalette}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Budget (e.g., Low, Mid, High)"
        value={budget}
        onChangeText={setBudget}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.fab} onPress={handleGeneratePress}>
        <Text style={styles.fabText}>Generate Dream Room</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingScreen = () => (
    <View style={styles.stepContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Connecting to AI Backend...</Text>
      <Text style={styles.loadingSubText}>Generating photorealistic concepts.</Text>
    </View>
  );

  const renderResultsScreen = () => (
    <View style={styles.stepContainer}>
       <Text style={styles.title}>Visualize & Refine</Text>
       <Text style={styles.subtitle}>Generated Concepts for "{stylePreference}"</Text>
      <ScrollView style={styles.resultsScrollView}>
        {generatedDesigns.map((design) => (
          <View key={design.id} style={styles.resultCard}>
            <Image source={{ uri: design.imageUrl }} style={styles.resultImage} />
            <Text style={styles.resultTitle}>{design.name}</Text>
            <TouchableOpacity style={styles.refineButton}>
              <Text style={styles.refineButtonText}>Refine Design</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.refinementContainer}>
        <TextInput
          style={styles.refinementInput}
          placeholder="Refine your design (e.g., 'Add a large rug')"
          value={refinementText}
          onChangeText={setRefinementText}
          placeholderTextColor="#888"
        />
      </View>
       <TouchableOpacity style={styles.resetButton} onPress={() => setCurrentStep(1)}>
          <Text style={styles.resetButtonText}>Start New Design</Text>
        </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    if (isLoading) return renderLoadingScreen();
    switch (currentStep) {
      case 1:
        return renderInputScreen();
      case 2:
         return renderLoadingScreen(); // Redundant but safe
      case 3:
        return renderResultsScreen();
      default:
        return renderInputScreen();
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

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  stepContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#2D3748',
  },
  fab: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: '#4A5568',
  },
   loadingSubText: {
    marginTop: 5,
    fontSize: 14,
    color: '#718096',
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultsScrollView: {
    width: '100%',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#E2E8F0',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  refineButton: {
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  refineButtonText: {
    color: '#2D3748',
    fontWeight: '600',
  },
  refinementContainer: {
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F0F4F8',
  },
  refinementInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
   resetButton: {
    marginTop: 20,
    backgroundColor: '#E53E3E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
