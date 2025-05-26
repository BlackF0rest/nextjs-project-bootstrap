import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, GestureResponderEvent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Car, Calendar, Users, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

interface CarData {
  id: number;
  name: string;
  image: string;
  nextService: {
    type: string;
    due: string;
    km: number;
    nextKm: number;
  };
}

interface ServiceData {
  date: string;
  car: string;
  type: string;
  description: string;
}

interface PostData {
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  hashtags?: string[];
}

interface ContributorData {
  name: string;
  avatar: string;
  posts: number;
  rank: number;
}

const CarCard: React.FC<{ car: CarData }> = ({ car }: { car: CarData }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.carImageContainer}>
        <Image source={{ uri: car.image }} style={styles.carImage} />
      </View>
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{car.name}</Text>
        <View style={styles.serviceInfo}>
          <Text style={styles.label}>Next {car.nextService.type}</Text>
          <View style={styles.row}>
            <Text style={[styles.highlight, car.nextService.type === 'Service' ? styles.serviceHighlight : styles.inspectionHighlight]}>
              in {car.nextService.nextKm.toLocaleString()} km
            </Text>
            <Text style={styles.muted}>Due: {car.nextService.due}</Text>
          </View>
          <Text style={styles.muted}>
            Odometer: {car.nextService.km.toLocaleString()} km
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const CalendarDayHeader: React.FC<{ day: string }> = ({ day }: { day: string }) => (
  <View style={styles.calendarDayHeader}>
    <Text style={styles.calendarDayText}>{day}</Text>
  </View>
);

function CarsScreen() {
  const cars: CarData[] = [
    {
      id: 1,
      name: "Audi RS7",
      image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      nextService: {
        type: "Service",
        due: "08/2024",
        km: 37400,
        nextKm: 5000,
      },
    },
    {
      id: 2,
      name: "Ferrari 488",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      nextService: {
        type: "Inspection",
        due: "12/2024",
        km: 19500,
        nextKm: 12000,
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Collector</Text>
      </View>
      <ScrollView style={styles.content}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Car size={20} stroke="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Add New Car</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function CalendarScreen() {
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const services: ServiceData[] = [
    {
      date: "21 Jun",
      car: "Audi RS7",
      type: "Service",
      description: "Oil Change & Inspection • 37,400 km"
    },
    {
      date: "02 Jul",
      car: "Ferrari 488",
      type: "Inspection",
      description: "Annual Inspection • 19,500 km"
    }
  ];

  const todos = [
    {
      title: "Check tire pressure",
      car: "Audi RS7",
      status: "pending"
    },
    {
      title: "Book detailing appointment",
      car: "Ferrari 488",
      status: "pending"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.calendarHeader}>
          {weekDays.map(day => (
            <CalendarDayHeader key={day} day={day} />
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Upcoming Services</Text>
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={[styles.card, styles.serviceCard]}>
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>{service.date.split(" ")[0]}</Text>
              <Text style={styles.dateMonth}>{service.date.split(" ")[1]}</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceCar}>{service.car}</Text>
              <Text style={styles.serviceType}>{service.type}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, styles.todoTitle]}>Things To Do</Text>
        {todos.map((todo, index) => (
          <TouchableOpacity key={index} style={[styles.card, styles.todoCard]}>
            <View style={styles.todoContent}>
              <Text style={styles.todoText}>{todo.title}</Text>
              <Text style={styles.todoCar}>{todo.car}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function CommunityScreen() {
  const discussions: PostData[] = [
    {
      author: "Emily Rivera",
      avatar: "https://example.com/avatar1.jpg",
      time: "2h ago",
      content: "What's your favorite tire brand for summer performance?",
      likes: 13,
      comments: 8,
      hashtags: ["tires"]
    },
    {
      author: "James Lin",
      avatar: "https://example.com/avatar2.jpg",
      time: "4h ago",
      content: "Just finished detailing my 488! Any tips for ceramic coating at home?",
      likes: 9,
      comments: 5
    }
  ];

  const contributors: ContributorData[] = [
    {
      name: "Emma Stone",
      avatar: "https://example.com/avatar3.jpg",
      posts: 42,
      rank: 1
    },
    {
      name: "Max Miller",
      avatar: "https://example.com/avatar4.jpg",
      posts: 35,
      rank: 2
    },
    {
      name: "Liam Novak",
      avatar: "https://example.com/avatar5.jpg",
      posts: 27,
      rank: 3
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
      </View>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.joinCard}>
          <View style={styles.joinIcon}>
            <Users size={24} stroke="#10b981" />
          </View>
          <Text style={styles.communityTitle}>Join the Car Community</Text>
          <Text style={styles.communitySubtitle}>
            Connect, share, and discuss with fellow car enthusiasts.
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Latest Discussions</Text>
        {discussions.map((post, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.post}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View style={styles.postHeaderText}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              {post.hashtags && (
                <View style={styles.hashtags}>
                  {post.hashtags.map(tag => (
                    <Text key={tag} style={styles.hashtag}>#{tag}</Text>
                  ))}
                </View>
              )}
              <View style={styles.postStats}>
                <Text style={styles.stat}>💬 {post.comments}</Text>
                <Text style={styles.stat}>❤️ {post.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Top Contributors</Text>
        <View style={styles.contributorsGrid}>
          {contributors.map((contributor, index) => (
            <View key={index} style={styles.contributorCard}>
              <Image source={{ uri: contributor.avatar }} style={styles.contributorAvatar} />
              <Text style={styles.contributorName}>{contributor.name}</Text>
              <Text style={styles.contributorPosts}>{contributor.posts} posts</Text>
              <Text style={styles.contributorRank}>#{contributor.rank}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: '#666',
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Cars" 
          component={CarsScreen}
          options={{
          tabBarIcon: ({ color }: { color: string }) => <Car size={20} stroke={color} />
          }}
        />
        <Tab.Screen 
          name="Calendar" 
          component={CalendarScreen}
          options={{
          tabBarIcon: ({ color }: { color: string }) => <Calendar size={20} stroke={color} />
          }}
        />
        <Tab.Screen 
          name="Community" 
          component={CommunityScreen}
          options={{
          tabBarIcon: ({ color }: { color: string }) => <Users size={20} stroke={color} />
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
          tabBarIcon: ({ color }: { color: string }) => <Settings size={20} stroke={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(39, 39, 42, 0.5)',
  },
  cardContent: {
    flexDirection: 'row',
    gap: 16,
  },
  carImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  serviceInfo: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlight: {
    fontWeight: '600',
  },
  serviceHighlight: {
    color: '#10b981',
  },
  inspectionHighlight: {
    color: '#eab308',
  },
  muted: {
    color: '#71717a',
  },
  addButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  calendarHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  calendarDayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  calendarDayText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '500',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  dateBox: {
    alignItems: 'center',
    minWidth: 48,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  dateMonth: {
    fontSize: 14,
    color: '#71717a',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceCar: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10b981',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  todoTitle: {
    marginTop: 24,
  },
  todoCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.5)',
    padding: 12,
  },
  todoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 15,
    color: '#fff',
  },
  todoCar: {
    fontSize: 14,
    color: '#71717a',
  },
  joinCard: {
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  joinIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  communitySubtitle: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
  },
  post: {
    gap: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  postHeaderText: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  postTime: {
    fontSize: 14,
    color: '#71717a',
  },
  postContent: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  hashtags: {
    flexDirection: 'row',
    gap: 8,
  },
  hashtag: {
    color: '#10b981',
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  stat: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  contributorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  contributorCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: 'rgba(24, 24, 27, 0.5)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  contributorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  contributorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  contributorPosts: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  contributorRank: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
  },
  tabBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 4,
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
});
