import { router } from 'expo-router';
import { Star, Trophy, Volume2, VolumeX, X, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Game, quizQuestions } from '@/data/games';

export function GamePlay({ game }: { game: Game }) {
  const [soundOn, setSoundOn] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (!gameStarted || gameComplete) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setGameComplete(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameComplete]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);

    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setScore((s) => s + 100);
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimer(60);
    setCurrentQuestion(0);
    setGameComplete(false);
    setSelectedAnswer(null);
  };

  return (
    <View style={{ backgroundColor: game.bgColor }} className="flex-1">
      <View className="p-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="p-2 rounded-xl">
          <X size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text className="flex-1 px-4 text-white text-lg font-bold" numberOfLines={1}>
          {game.name}
        </Text>

        <TouchableOpacity
          onPress={() => setSoundOn(!soundOn)}
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          className="p-2 rounded-xl"
        >
          {soundOn ? <Volume2 size={24} color="#ffffff" /> : <VolumeX size={24} color="#ffffff" />}
        </TouchableOpacity>
      </View>

      {gameStarted && !gameComplete && (
        <View className="px-4 mb-4">
          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-2xl p-4 flex-row justify-around">
            <View className="items-center">
              <View className="flex-row items-center gap-1 mb-1">
                <Trophy size={16} color="#ffffff" />
                <Text className="text-2xl text-white font-bold">{score}</Text>
              </View>
              <Text className="text-xs text-white">Score</Text>
            </View>
            <View className="items-center">
              <View className="flex-row items-center gap-1 mb-1">
                <Zap size={16} color="#ffffff" />
                <Text className="text-2xl text-white font-bold">{timer}s</Text>
              </View>
              <Text className="text-xs text-white">Time</Text>
            </View>
            <View className="items-center">
              <View className="flex-row items-center gap-1 mb-1">
                <Star size={16} color="#ffffff" />
                <Text className="text-2xl text-white font-bold">
                  {currentQuestion + 1}/{quizQuestions.length}
                </Text>
              </View>
              <Text className="text-xs text-white">Question</Text>
            </View>
          </View>
        </View>
      )}

      <View className="flex-1 items-center justify-center p-6">
        {!gameStarted ? (
          <View className="items-center">
            <Text style={{ fontSize: 96 }} className="mb-6">
              {game.icon}
            </Text>
            <Text className="text-white text-3xl mb-4 font-bold text-center">{game.name}</Text>
            <Text className="text-white/90 text-lg mb-8 text-center">{game.description}</Text>
            <TouchableOpacity onPress={startGame} className="bg-white px-8 py-4 rounded-2xl">
              <Text style={{ color: game.bgColor }} className="text-lg font-bold">
                Start Game
              </Text>
            </TouchableOpacity>
          </View>
        ) : gameComplete ? (
          <View className="bg-white rounded-3xl p-8 w-full max-w-md items-center">
            <Text style={{ fontSize: 60 }} className="mb-4">
              🎉
            </Text>
            <Text className="text-2xl mb-2 font-bold">Game Complete!</Text>
            <Text className="text-gray-600 mb-6">Great job! You earned:</Text>

            <View className="bg-gray-50 rounded-2xl p-6 mb-6 items-center w-full">
              <Text style={{ color: game.bgColor, fontSize: 44 }} className="mb-2 font-bold">
                {score}
              </Text>
              <Text className="text-gray-600">Points</Text>
            </View>

            <View className="flex-row gap-3 mb-6 w-full">
              <View className="flex-1 bg-yellow-50 rounded-xl p-3 items-center">
                <Text className="text-2xl mb-1">+50</Text>
                <Text className="text-xs text-gray-600">XP</Text>
              </View>
              <View className="flex-1 bg-orange-50 rounded-xl p-3 items-center">
                <Text className="text-2xl mb-1">⭐</Text>
                <Text className="text-xs text-gray-600">Star</Text>
              </View>
              <View className="flex-1 bg-purple-50 rounded-xl p-3 items-center">
                <Text className="text-2xl mb-1">🏆</Text>
                <Text className="text-xs text-gray-600">Trophy</Text>
              </View>
            </View>

            <View className="flex-row gap-3 w-full">
              <TouchableOpacity onPress={startGame} style={{ backgroundColor: game.bgColor }} className="flex-1 rounded-xl py-3 items-center">
                <Text className="text-white font-semibold">Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.back()} className="flex-1 bg-gray-100 rounded-xl py-3 items-center">
                <Text className="text-gray-700 font-semibold">Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="w-full max-w-md">
            <View className="bg-white rounded-3xl p-6 mb-6">
              <Text className="text-xl mb-6 text-center font-bold">{quizQuestions[currentQuestion].question}</Text>

              <View className="gap-3">
                {quizQuestions[currentQuestion].answers.map((answer, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === quizQuestions[currentQuestion].correct;
                  const showResult = selectedAnswer !== null;

                  let bg = '#F3F4F6';
                  let borderColor = 'transparent';
                  if (showResult) {
                    if (isSelected) {
                      bg = isCorrect ? '#DCFCE7' : '#FEE2E2';
                      borderColor = isCorrect ? '#10B981' : '#EF4444';
                    } else if (isCorrect) {
                      bg = '#DCFCE7';
                      borderColor = '#10B981';
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={answer}
                      onPress={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      style={{ backgroundColor: bg, borderWidth: 2, borderColor }}
                      className="p-4 rounded-xl flex-row justify-between items-center"
                    >
                      <Text className="font-semibold">{answer}</Text>
                      {showResult && isCorrect && <Text>✓</Text>}
                      {showResult && isSelected && !isCorrect && <Text>✗</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} className="rounded-full h-2 overflow-hidden">
              <View
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`, backgroundColor: '#ffffff' }}
                className="h-full"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
