import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function JobsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <Text style={styles.title}>Real-Time Job Finder</Text>
      <Text style={styles.subtitle}>Live jobs from Naukri, LinkedIn, Internshala.</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by role, skill, or exam..."
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContainer}>
        <TouchableOpacity style={styles.filterPillPrimary}>
          <Ionicons name="options-outline" size={16} color="#ffd700" style={{marginRight: 4}} />
          <Text style={styles.filterPillTextPrimary}>Filters</Text>
        </TouchableOpacity>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Software Engineer</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Fresher</Text>
        </View>
      </ScrollView>

      {/* Job Card 1 */}
      <View style={[styles.jobCard, styles.jobCardHighlight]}>
        
        {/* ATS Badge */}
        <View style={styles.atsBadge}>
          <MaterialCommunityIcons name="check-circle-outline" size={14} color="#ffd700" style={{marginRight: 4}} />
          <Text style={styles.atsBadgeText}>98% ATS</Text>
        </View>

        <Text style={styles.jobTitle}>Software Engineer</Text>
        <View style={styles.companyRow}>
          <Ionicons name="briefcase-outline" size={14} color="#9ca3af" />
          <Text style={styles.companyName}>Naukri</Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>Python</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>React</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Fresher</Text></View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.postedText}>Posted <Text style={styles.boldText}>2h</Text> ago</Text>
          <TouchableOpacity style={styles.applyButton}>
             <LinearGradient colors={['#4a6bff', '#2a48df']} style={styles.applyGradient}>
                <Text style={styles.applyButtonText}>APPLY NOW</Text>
             </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Card 2 */}
      <View style={styles.jobCard}>
        
        <Ionicons name="bookmark-outline" size={20} color="#9ca3af" style={styles.bookmarkIcon} />

        <Text style={styles.jobTitle}>Data Analyst Intern</Text>
        <View style={styles.companyRow}>
          <Ionicons name="business-outline" size={14} color="#9ca3af" />
          <Text style={styles.companyName}>Internshala</Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>SQL</Text></View>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>Excel</Text></View>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>Remote</Text></View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.postedText}>Posted <Text style={styles.boldText}>1d</Text> ago</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>VIEW DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Job Card 3 */}
      <View style={styles.jobCard}>
        
        <Ionicons name="bookmark-outline" size={20} color="#9ca3af" style={styles.bookmarkIcon} />

        <Text style={styles.jobTitle}>Frontend Developer</Text>
        <View style={styles.companyRow}>
          <Ionicons name="logo-linkedin" size={14} color="#9ca3af" />
          <Text style={styles.companyName}>LinkedIn</Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>React</Text></View>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>Tailwind</Text></View>
          <View style={styles.tagDark}><Text style={styles.tagTextDark}>1-3 Yrs</Text></View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.postedText}>Posted <Text style={styles.boldText}>3d</Text> ago</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>VIEW DETAILS</Text>
          </TouchableOpacity>
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
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: '#161828',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#2A2D43',
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    color: '#fff',
    fontSize: 14,
  },
  pillsScroll: {
    flexGrow: 0,
    marginBottom: 25,
  },
  pillsContainer: {
    paddingRight: 20,
  },
  filterPillPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  filterPillTextPrimary: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 13,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#161828',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  pillText: {
    color: '#d1d5db',
    fontWeight: '500',
    fontSize: 13,
  },
  jobCard: {
    backgroundColor: '#161828',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2D43',
    marginBottom: 20,
    position: 'relative',
  },
  jobCardHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: '#ffd700',
  },
  atsBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  atsBadgeText: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    paddingRight: 80,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  companyName: {
    color: '#9ca3af',
    fontSize: 14,
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: 'rgba(166, 177, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#a6b1ff',
    fontSize: 12,
    fontWeight: '600',
  },
  tagDark: {
    backgroundColor: '#1B1E31',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagTextDark: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2A2D43',
    paddingTop: 15,
  },
  postedText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  boldText: {
    color: '#d1d5db',
    fontWeight: 'bold',
  },
  applyButton: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  applyGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  viewButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#111322',
    borderWidth: 1,
    borderColor: '#2A2D43',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  }
});
