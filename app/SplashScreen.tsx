import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false); 
  const fullText = "NOTES...";
  const navigation = useNavigation();

  useEffect(() => {
    let index = 0; 
    let animationFrameId; 
    let cursorInterval; 

    const typeText = () => {
      if (index < fullText.length) {
        setDisplayText(prev => prev + fullText[index]); 
        index++;
        
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(typeText); 
        }, 200); 
      } else {
        
        setShowCursor(true);
        
        
        const blinkDuration = 2000;
        const blinkInterval = 500; 
        let blinkCount = blinkDuration / blinkInterval; 

        cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev); 
          blinkCount--;
          if (blinkCount <= 0) {
            clearInterval(cursorInterval); 
            navigation.navigate('Categories'); 
          }
        }, blinkInterval);
      }
    };

    // Starta textskrivning
    typeText();

    return () => {
      cancelAnimationFrame(animationFrameId); 
      clearInterval(cursorInterval); 
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.textLogo}>
        {displayText}
        {showCursor ? '|' : ''} 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'black', 
  },
  textLogo: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center', 
    fontFamily: 'monospace', 
    letterSpacing: 2, 
  },
});

export default Splash;
