import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
// *** FIX: Import COLORS directly from the styles file ***
import { styles, COLORS } from '../styles';

// Assuming your logo is saved at this path
const logo = require('../images/fengshui.png');

const InputScreen = ({
  error,
  image,
  takePicture,
  pickImage,
  stylePreference,
  setStylePreference,
  colorPalette,
  setColorPalette,
  budget,
  setBudget,
  handleGeneratePress,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      {/* *** FIX: Changed resizeMode to 'cover' to fill the area *** */}
      <Image source={logo} style={styles.logo} resizeMode="cover" />
      <Text style={styles.title}>FENGSHUI AI</Text>
      <Text style={styles.subtitle}>Your Personal Interior Designer</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.imagePickerContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: COLORS.textSecondary }}>Your Room Photo</Text>
          </View>
        )}
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={takePicture}>
            <Text style={styles.imageButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Choose from Library</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Style (e.g., Industrial, Cottagecore)"
        // *** FIX: Use the imported COLORS object directly ***
        placeholderTextColor={COLORS.textSecondary}
        value={stylePreference}
        onChangeText={setStylePreference}
      />
      <TextInput
        style={styles.input}
        placeholder="Color Palette (e.g., Warm Tones, Earthy)"
        placeholderTextColor={COLORS.textSecondary}
        value={colorPalette}
        onChangeText={setColorPalette}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget (e.g., Low, Mid, High)"
        placeholderTextColor={COLORS.textSecondary}
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.fab} onPress={handleGeneratePress}>
        <Text style={styles.fabText}>Generate Design Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InputScreen;
