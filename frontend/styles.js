import { StyleSheet, Platform } from 'react-native';

// --- Cozy Interior Design Color Palette ---
export const COLORS = {
  background: '#FBF9F6', 
  textPrimary: '#3D3B38',   
  textSecondary: '#7A756F', 
  accent: '#B99B6B',       
  accentLight: '#EAE5DD',  
  white: '#FFFFFF',
  error: '#C0392B',
};

// --- Typography ---
const FONT_FAMILY = {
  serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  sans: Platform.OS === 'ios' ? 'System' : 'sans-serif',
};

export const styles = StyleSheet.create({
  // --- Core Layout ---
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  stepContainer: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  fullScreenContainer: { flex: 1, backgroundColor: COLORS.background },
  
  // --- Typography & General Elements ---
  title: { 
    fontSize: 32, // Slightly larger for more impact
    fontFamily: FONT_FAMILY.serif, // Use serif font
    color: COLORS.textPrimary, 
    textAlign: 'center', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    fontFamily: FONT_FAMILY.sans, // Keep subtitle readable
    color: COLORS.textSecondary, 
    textAlign: 'center', 
    marginBottom: 24 
  },
  errorText: { 
    color: COLORS.error, 
    marginBottom: 15, 
    textAlign: 'center', 
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },

  // --- InputScreen ---
  logo: {
    width: 120,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 12,
  },
  imagePickerContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
  previewImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: COLORS.accentLight },
  imagePlaceholder: { width: '100%', height: 200, borderRadius: 12, backgroundColor: COLORS.accentLight, justifyContent: 'center', alignItems: 'center' },
  imageButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 15 },
  imageButton: { backgroundColor: COLORS.accentLight, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  imageButtonText: { color: COLORS.textPrimary, fontWeight: '600', fontFamily: FONT_FAMILY.sans, },
  input: { 
    width: '100%', 
    height: 55, 
    backgroundColor: COLORS.white, 
    borderWidth: 1, 
    borderColor: COLORS.accentLight, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 15,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.sans,
  },
  fab: { 
    backgroundColor: COLORS.accent, 
    borderRadius: 30, 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    marginTop: 10, 
    alignSelf: 'center' 
  },
  fabText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold', fontFamily: FONT_FAMILY.sans, },

  // --- Loading ---
  loadingText: { marginTop: 15, fontSize: 18, color: COLORS.textSecondary, fontFamily: FONT_FAMILY.sans, },

  // --- DesignPlanScreen ---
  resultsScrollView: { width: '100%', paddingHorizontal: 20 },
  planSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24, // Make section titles stand out
    fontFamily: FONT_FAMILY.serif, // Use serif font
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accentLight,
    paddingBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
    fontFamily: FONT_FAMILY.serif, // Use serif for a more literary feel
    fontStyle: 'italic',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.serif,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginRight: 12,
    lineHeight: 24,
  },
  stepText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 24,
    fontFamily: FONT_FAMILY.sans,
  },
  shoppingItemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accentLight,
  },
  shoppingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.sans,
  },
  shoppingItemDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  shoppingItemLink: {
    fontSize: 24,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  resetButton: { 
    backgroundColor: 'transparent', 
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 25, 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    alignSelf: 'center', 
    margin: 20 
  },
  resetButtonText: { color: COLORS.accent, fontWeight: 'bold', fontSize: 16, fontFamily: FONT_FAMILY.sans, },
});
