import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';

import { Answer, QuizItem } from '@/types/quiz';
import randomHelper from '@/helpers/random.helper';
import { QuizCard } from '@/components/QuizCard';
import ScoreModal from '@/components/ScoreModal';

const quizURL = 'https://gist.githubusercontent.com/cmota/f7919cd962a061126effb2d7118bec72/raw/96ae8cbebd92c97dfbe53ad8927a45a28f8d2358/questions.json';

export default function HomeScreen() {
  const questionLength = 20;

  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [totalAwnsers, score] = useMemo(() => {
    const total = quiz.filter(item => item.choose).length
    const score = quiz.filter(item => item.choose === item.answer).length
    return [total, score]
  }, [quiz]);
  const isSubmitDisable = useMemo(() => totalAwnsers !== quiz.length, [totalAwnsers]);

  useEffect(() => {
    init()
  }, []);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await fetch(quizURL, { cache: 'force-cache' }).then(async response => {
        const allQuestions = await response.json();
        const questions = randomHelper.getRandomItems(allQuestions, questionLength);
        setQuiz(questions);
      })
      setSubmitted(false)
    } finally {
      setLoading(false);
    }
  }, [questionLength])

  const onSelectAwnser = (questionIndex: number, anwser: Answer) => {
    const updateQuiz = quiz.map((item, index) => ({ ...item, choose: index === questionIndex ? anwser : item.choose }))
    setQuiz(updateQuiz);
  }

  const onPressSubmit = () => {
    if (submitted) {
      init();
    } else {
      setSubmitted(true);
      setModalVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#00695c" />
        </View>
      ) : (
        <>
          <FlatList
            data={quiz}
            renderItem={({ item, index }) => <QuizCard quizItem={item} onSelectAwnser={(awnser) => onSelectAwnser(index, awnser)} submitted={submitted} />}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <Pressable 
            style={[
              styles.startButton,
              isSubmitDisable && styles.disabledButton
            ]} 
            disabled={isSubmitDisable}
            onPress={onPressSubmit}
          >
            <Text style={styles.buttonText}>
              { isSubmitDisable ?  `${totalAwnsers}/${quiz.length}` : submitted ? 'Reset' : 'Submit' }
            </Text>
          </Pressable>
        </>
      )}

      <ScoreModal
        visible={modalVisible}
        score={score}
        total={quiz.length}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
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
  optionText: {
    fontSize: 16,
    color: '#004d40',
  },
  startButton: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
    borderColor: '#00695c',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#004d40',
  },
  disabledButton: {
    backgroundColor: '#cfd8dc',
    borderColor: '#b0bec5',
  },
});
