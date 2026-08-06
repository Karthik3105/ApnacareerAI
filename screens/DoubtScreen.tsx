import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DoubtScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <Text style={styles.sectionTitle}>Select Target Exam</Text>
      
      {/* Exam Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContainer}>
        <View style={[styles.pill, styles.pillActive]}>
          <Text style={styles.pillTextActive}>JEE Main/Adv</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>NEET</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>UPSC</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>SSC/Bank</Text>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput}
          placeholder="Type your doubt here... (e.g., Explain torque with an example)"
          placeholderTextColor="#9ca3af"
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={16} color="#111322" style={{ marginLeft: 3 }} />
        </TouchableOpacity>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="document-attach-outline" size={20} color="#a6b1ff" />
          <Text style={styles.uploadText}>Upload Image/PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Solution */}
      <View style={styles.recentHeader}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#ffd700" />
        <Text style={styles.recentTitle}>Recent Solution</Text>
      </View>

      <View style={styles.solutionCard}>
        <View style={styles.subjectPill}>
          <Text style={styles.subjectPillText}>JEE Physics</Text>
        </View>
        
        <Text style={styles.solutionTitle}>Kinematics: Projectile Motion</Text>
        
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            Q: A ball is thrown at 45° with 20m/s. Find max height.
          </Text>
        </View>

        <Text style={styles.stepText}>
          <Text style={styles.stepLabel}>Step 1:</Text> Formula for Max Height (H) is 
          <Text style={styles.mathHighlight}> u²sin²θ / 2g </Text>
        </Text>

        <Text style={styles.stepText}>
          <Text style={styles.stepLabel}>Step 2:</Text> Here, u = 20 m/s, θ = 45°, g ≈ 10 m/s²
        </Text>

        <Text style={styles.stepText}>
          <Text style={styles.stepLabel}>Step 3:</Text> H = (20² * sin²45°) / (2 * 10)
        </Text>

        <Text style={styles.stepText}>
          <Text style={styles.stepLabel}>Step 4:</Text> H = (400 * 0.5) / 20 = 200 / 20 = <Text style={styles.boldText}>10 meters</Text>
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111322',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  pillsScroll: {
    flexGrow: 0,
    marginBottom: 25,
  },
  pillsContainer: {
    paddingRight: 20,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1B1E31',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  pillActive: {
    borderColor: '#a6b1ff',
    backgroundColor: 'rgba(166, 177, 255, 0.1)',
  },
  pillText: {
    color: '#9ca3af',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#a6b1ff',
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2D43',
    marginBottom: 30,
    position: 'relative',
  },
  textInput: {
    color: '#fff',
    fontSize: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#a6b1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A2D43',
  },
  dividerText: {
    color: '#9ca3af',
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(166, 177, 255, 0.4)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(166, 177, 255, 0.05)',
  },
  uploadText: {
    color: '#a6b1ff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  solutionCard: {
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#ffd700',
    position: 'relative',
    overflow: 'hidden',
  },
  subjectPill: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
  },
  subjectPillText: {
    color: '#ffd700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    marginTop: 5,
  },
  questionBox: {
    backgroundColor: '#111322',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  questionText: {
    color: '#fff',
    fontWeight: '600',
    lineHeight: 22,
  },
  stepText: {
    color: '#d1d5db',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 12,
  },
  stepLabel: {
    color: '#a6b1ff',
    fontWeight: 'bold',
  },
  mathHighlight: {
    backgroundColor: '#1B1E31',
    color: '#e5e7eb',
    fontFamily: 'monospace',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
  }
});
