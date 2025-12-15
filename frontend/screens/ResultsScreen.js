import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const DesignPlanScreen = ({ designPlan, handleShopLinkPress, resetState }) => {
  if (!designPlan) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text style={styles.errorText}>No design plan available. Please try again.</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetState}>
          <Text style={styles.resetButtonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <ScrollView style={styles.resultsScrollView}>
        <Text style={styles.title}>Your AI Design Plan</Text>

        {/* Design Description Section */}
        <View style={styles.planSection}>
          <Text style={styles.sectionTitle}>Design Vision</Text>
          <Text style={styles.descriptionText}>{designPlan.designDescription}</Text>
        </View>

        {/* Action Steps Section */}
        <View style={styles.planSection}>
          <Text style={styles.sectionTitle}>Action Steps</Text>
          {designPlan.actionSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Shopping List Section */}
        <View style={styles.planSection}>
          <Text style={styles.sectionTitle}>Shopping List</Text>
          {designPlan.shoppingList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.shoppingItemCard}
              onPress={() => handleShopLinkPress(item.affiliateUrl)}
            >
              <View>
                <Text style={styles.shoppingItemTitle}>{item.item}</Text>
                <Text style={styles.shoppingItemDetails}>{item.details}</Text>
              </View>
              <Text style={styles.shoppingItemLink}>&rarr;</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.resetButton} onPress={resetState}>
        <Text style={styles.resetButtonText}>Start New Design</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DesignPlanScreen;
