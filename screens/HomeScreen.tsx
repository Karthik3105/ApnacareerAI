import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Badge */}
      <View style={styles.badgeContainer}>
        <MaterialCommunityIcons name="lightning-bolt" size={14} color="#ffd700" />
        <Text style={styles.badgeText}>Powered by ApnaCareer AI</Text>
      </View>

      {/* Hero Title */}
      <Text style={styles.heroTitle}>Your AI-Powered Learning & Career Platform</Text>
      
      <Text style={styles.subtitle}>
        Solve doubts 24/7. Build ATS-optimized resumes. Find real-time jobs. 
        From JEE to UPSC, from Fresher to Pro — we've got you covered.
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryButton}>
        <LinearGradient colors={['#4a6bff', '#2a48df']} style={styles.buttonGradient}>
          <Text style={styles.primaryButtonText}>GET STARTED</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <MaterialCommunityIcons name="head-question-outline" size={20} color="#fff" />
        <Text style={styles.secondaryButtonText}>Try Doubt Solver</Text>
      </TouchableOpacity>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10M+</Text>
          <Text style={styles.statLabel}>STUDENTS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumberWhite}>24/7</Text>
          <Text style={styles.statLabel}>AI AVAILABLE</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>ATS SCORE</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumberPurple}>₹199</Text>
          <Text style={styles.statLabel}>PRO PLAN</Text>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresHeader}>
        <Text style={styles.featuresTitle}>Everything You Need in One Platform</Text>
        <Text style={styles.featuresSubtitle}>AI-powered tools for students and job seekers</Text>
      </View>

      {/* Feature Card 1 */}
      <View style={styles.featureCard}>
        <View style={styles.featureCardHeader}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="chatbubbles-outline" size={20} color="#ffd700" />
          </View>
          <Text style={styles.featureCardTitle}>AI Doubt Solver</Text>
          <MaterialCommunityIcons name="head-lightbulb-outline" size={40} color="rgba(255,255,255,0.05)" style={styles.bgIcon} />
        </View>
        <Text style={styles.featureCardDesc}>
          Stuck on a problem at 11pm? Ask JEE, NEET, UPSC, SSC, Banking — any exam. 
          Get step-by-step answers in Hindi/English.
        </Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>JEE</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>NEET</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>UPSC</Text></View>
        </View>
      </View>

      {/* Feature Card 2 */}
      <View style={styles.featureCard}>
        <View style={styles.featureCardHeader}>
          <View style={styles.featureIconContainerBlue}>
            <Ionicons name="document-text-outline" size={20} color="#a6b1ff" />
          </View>
          <Text style={styles.featureCardTitle}>Resume Builder</Text>
        </View>
        <Text style={styles.featureCardDesc}>
          5 premium DOCX templates. ATS-optimised output. Freshers to experienced. 
          Get professional, quantified resumes.
        </Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>5 Templates</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>ATS Optimised</Text></View>
        </View>
      </View>

      {/* Feature Card 3 */}
      <View style={styles.featureCard}>
        <View style={styles.featureCardHeader}>
          <View style={styles.featureIconContainerOrange}>
            <Ionicons name="briefcase-outline" size={20} color="#ffa500" />
          </View>
          <Text style={styles.featureCardTitle}>Real-Time Job Finder</Text>
        </View>
        <Text style={styles.featureCardDesc}>
          Live jobs from Naukri, LinkedIn, Internshala. Filter by exam/skill. 
          Find government and private sector jobs.
        </Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>Live Jobs</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Govt & Pvt</Text></View>
        </View>
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
    alignItems: 'center',
    paddingBottom: 50,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1E31',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 25,
  },
  badgeText: {
    color: '#a6b1ff',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#a6b1ff',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 45,
    textShadowColor: 'rgba(166, 177, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: '#1B1E31',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1B1E31',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  statNumberWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statNumberPurple: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a6b1ff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 10,
    color: '#9ca3af',
    letterSpacing: 1,
  },
  featuresHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  featuresSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  featureCard: {
    width: '100%',
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2D43',
    position: 'relative',
    overflow: 'hidden',
  },
  featureCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureIconContainerBlue: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(166, 177, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureIconContainerOrange: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bgIcon: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
  featureCardDesc: {
    color: '#9ca3af',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#1B1E31',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: '#a6b1ff',
    fontSize: 11,
    fontWeight: '600',
  }
});
