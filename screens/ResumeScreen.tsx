import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResumeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Resume <Text style={styles.titleGold}>Builder</Text></Text>
        <Text style={styles.description}>
          5 premium DOCX templates. ATS-optimised output. Freshers to experienced. 
          No more "I am hardworking" — get professional, quantified resumes.
        </Text>
      </View>

      {/* ATS Score Card */}
      <View style={styles.scoreCard}>
        
        {/* Ring Placeholder */}
        <View style={styles.ringContainer}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.scoreText}>98%</Text>
              <Text style={styles.scoreLabel}>ATS SCORE</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusHeader}>
          <Ionicons name="checkmark-circle" size={20} color="#ffd700" />
          <Text style={styles.statusTitle}>Resume Ready!</Text>
        </View>

        <Text style={styles.statusDesc}>
          Your resume is highly optimized for Applicant Tracking Systems. AI has quantified 
          your achievements and formatted them for maximum impact.
        </Text>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="star-four-points-outline" size={12} color="#a6b1ff" />
            <Text style={styles.tagText}>Quantified</Text>
          </View>
          <View style={styles.tagDark}>
            <Text style={styles.tagTextDark}>HR Ready</Text>
          </View>
        </View>
      </View>

      {/* Templates Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Premium Templates</Text>
        <Text style={styles.sectionLabel}>5 Available</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesScroll} contentContainerStyle={styles.templatesContainer}>
        
        <View style={[styles.templateCard, styles.templateActive]}>
          <View style={styles.templatePreview}>
            <View style={styles.activePill}><Text style={styles.activePillText}>✓ Active</Text></View>
            <View style={styles.mockLine} />
            <View style={[styles.mockLine, {width: '60%'}]} />
            <View style={[styles.mockLine, {width: '80%', marginTop: 10}]} />
          </View>
          <Text style={styles.templateName}>Tech Executive</Text>
          <Text style={styles.templateDesc}>Best for IT Roles</Text>
        </View>

        <View style={styles.templateCard}>
          <View style={styles.templatePreviewDark}>
             <View style={styles.mockCircle} />
             <View style={[styles.mockLine, {width: '70%', marginTop: -15, marginLeft: 25}]} />
          </View>
          <Text style={styles.templateName}>Modern Creative</Text>
          <Text style={styles.templateDesc}>Design & Media</Text>
        </View>

        <View style={styles.templateCard}>
          <View style={styles.templatePreviewDark}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View style={[styles.mockLine, {width: '40%'}]} />
              <View style={[styles.mockLine, {width: '40%'}]} />
            </View>
          </View>
          <Text style={styles.templateName}>Harvard Classic</Text>
          <Text style={styles.templateDesc}>Academic/Gov</Text>
        </View>

      </ScrollView>

      {/* AI Analysis */}
      <View style={styles.analysisCard}>
        <View style={styles.analysisHeader}>
          <Ionicons name="bar-chart-outline" size={20} color="#a6b1ff" />
          <Text style={styles.analysisTitle}>AI Analysis</Text>
        </View>

        <View style={styles.analysisItem}>
          <Ionicons name="checkmark" size={18} color="#ffd700" style={styles.checkIcon} />
          <Text style={styles.analysisText}>
            Replaced generic terms with quantified metrics (e.g., "Increased sales by 15%").
          </Text>
        </View>

        <View style={styles.analysisItem}>
          <Ionicons name="checkmark" size={18} color="#ffd700" style={styles.checkIcon} />
          <Text style={styles.analysisText}>
            Matched keywords to typical Software Engineer Job Descriptions.
          </Text>
        </View>

        <View style={styles.analysisItem}>
          <Ionicons name="information-circle-outline" size={18} color="#9ca3af" style={styles.checkIcon} />
          <Text style={styles.analysisText}>
            Suggestion: Add link to GitHub portfolio.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <LinearGradient colors={['#4a6bff', '#2a48df']} style={styles.buttonGradient}>
            <Ionicons name="download-outline" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>DOWNLOAD DOCX</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="pencil-outline" size={18} color="#fff" />
          <Text style={styles.secondaryButtonText}>EDIT CONTENT</Text>
        </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  titleGold: {
    color: '#ffd700',
  },
  description: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  scoreCard: {
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: '#2A2D43',
    alignItems: 'center',
    marginBottom: 30,
  },
  ringContainer: {
    marginBottom: 20,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  ringOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#ffd700',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'rgba(255, 215, 0, 0.2)', // Fake progress
    transform: [{ rotate: '45deg' }],
  },
  ringInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111322',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#9ca3af',
    letterSpacing: 1,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  statusDesc: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(166, 177, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(166, 177, 255, 0.3)',
    marginRight: 10,
  },
  tagText: {
    color: '#a6b1ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  tagDark: {
    backgroundColor: '#1B1E31',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagTextDark: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionLabel: {
    fontSize: 12,
    color: '#a6b1ff',
    fontWeight: 'bold',
  },
  templatesScroll: {
    flexGrow: 0,
    marginBottom: 30,
  },
  templatesContainer: {
    paddingRight: 20,
  },
  templateCard: {
    width: 140,
    marginRight: 15,
  },
  templateActive: {
    borderColor: '#4a6bff',
  },
  templatePreview: {
    height: 180,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#a6b1ff',
  },
  templatePreviewDark: {
    height: 180,
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  activePill: {
    backgroundColor: 'rgba(166, 177, 255, 0.2)',
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  activePillText: {
    color: '#4a6bff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mockLine: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    marginBottom: 6,
  },
  mockCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  templateName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  templateDesc: {
    color: '#9ca3af',
    fontSize: 11,
  },
  analysisCard: {
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  analysisItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginTop: 2,
    marginRight: 10,
  },
  analysisText: {
    color: '#d1d5db',
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  primaryButton: {
    width: '100%',
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#111322',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  }
});
