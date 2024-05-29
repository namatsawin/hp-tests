import React from 'react';
import { Pressable, View, ViewProps, Text, StyleSheet } from 'react-native';
import { Answer, QuizItem } from '@/types/quiz';

export interface Props extends ViewProps {
  quizItem: QuizItem;
  onSelectAwnser: (choice: Answer) => void;
  submitted: boolean;
}

export function QuizCard({ quizItem, onSelectAwnser, submitted, ...rest }: Props) {
  const choices: Answer[] = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.card} {...rest}>
      <Text style={styles.questionText}>{quizItem.question}</Text>
      <View style={styles.optionsContainer}>
        {choices.map((choice, choiceIndex) => {
          const isSelected = quizItem.choose === choice;
          const isCorrect = submitted && quizItem.answer === choice;
          const isWrong = submitted && isSelected && !isCorrect;

          return (
            <Pressable
              style={[
                styles.optionButton,
                isSelected && styles.selectedOptionButton,
                isCorrect && styles.correctOptionButton,
                isWrong && styles.wrongOptionButton
              ]}
              onPress={() => onSelectAwnser(choice)}
              key={choiceIndex}
              disabled={submitted}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                  isCorrect && styles.correctOptionText,
                  isWrong && styles.wrongOptionText
                ]}
              >
                {quizItem[choice]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionButton: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderColor: '#00695c',
    borderWidth: 1,
  },
  selectedOptionButton: {
    backgroundColor: '#b2dfdb', 
    borderWidth: 2,
  },
  correctOptionButton: {
    backgroundColor: '#c8e6c9', 
    borderColor: '#388e3c',
  },
  wrongOptionButton: {
    backgroundColor: '#ffcdd2', 
    borderColor: '#d32f2f',
  },
  optionText: {
    fontSize: 16,
    color: '#004d40',
  },
  selectedOptionText: {
    color: '#004d40',
  },
  correctOptionText: {
    color: '#2e7d32',
  },
  wrongOptionText: {
    color: '#c62828',
  },
});
