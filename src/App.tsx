/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  ChevronRight,
  Info,
  ExternalLink
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QUESTION_BANK, type Question, Difficulty, GrammarPoint } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-rose-100 text-rose-700',
    info: 'bg-sky-100 text-sky-700',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider", variants[variant])}>
      {children}
    </span>
  );
};

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-indigo-500"
      />
    </div>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useState<{ questionId: string, isCorrect: boolean }[]>([]);

  const currentQuestion = QUESTION_BANK[currentIndex];
  const totalQuestions = QUESTION_BANK.length;

  const handleOptionSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isSubmitted) return;
    
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setHistory(prev => [...prev, { questionId: currentQuestion.id, isCorrect }]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setHistory([]);
  };

  const getEncouragement = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return "太棒了！你真是个语法小达人！🌟";
    if (ratio >= 0.8) return "做得好！离满分只有一步之遥！🚀";
    if (ratio >= 0.6) return "不错哦！继续加油练习！👍";
    return "别灰心！每一个错误都是进步的机会。💪";
  };

  // Render the sentence with the blank replaced by the selected option or a placeholder
  const renderSentence = () => {
    const parts = currentQuestion.sentence.split('____');
    const selectedText = currentQuestion.options.find(o => o.id === selectedOptionId)?.text;
    
    return (
      <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 tracking-tight">
        {parts[0]}
        <span 
          className={cn(
            "inline-block min-w-[100px] px-3 py-1 mx-2 border-b-2 transition-all duration-300",
            !selectedOptionId && "border-slate-300 text-slate-300 italic",
            selectedOptionId && !isSubmitted && "border-indigo-500 text-indigo-600",
            isSubmitted && selectedOptionId === currentQuestion.correctOptionId && "border-emerald-500 text-emerald-600 bg-emerald-50",
            isSubmitted && selectedOptionId !== currentQuestion.correctOptionId && "border-rose-500 text-rose-600 bg-rose-50"
          )}
        >
          {selectedText || "________"}
        </span>
        {parts[1]}
      </div>
    );
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full">
            <Trophy size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">练习完成！</h1>
          <p className="text-slate-500 mb-8">{getEncouragement(score, totalQuestions)}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score}<span className="text-2xl text-slate-400 font-normal">/{totalQuestions}</span>
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">你的最终得分</div>
          </div>

          <button 
            onClick={handleRestart}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-200"
          >
            <RotateCcw size={20} />
            再试一次
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">语法大闯关</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">难度：小学</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-400 mb-1">
              第 {currentIndex + 1} 题 / 共 {totalQuestions} 题
            </div>
            <ProgressBar current={currentIndex + 1} total={totalQuestions} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Question Section */}
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50" />
            
            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              <Badge variant={
                currentQuestion.difficulty === Difficulty.BEGINNER ? 'success' :
                currentQuestion.difficulty === Difficulty.INTERMEDIATE ? 'warning' : 'error'
              }>
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="info">
                {currentQuestion.category}
              </Badge>
            </div>

            <div className="mb-12 relative z-10">
              {renderSentence()}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQuestion.correctOptionId;
                
                let buttonClass = "flex items-center justify-between p-5 rounded-2xl border-2 text-lg font-medium transition-all duration-200 text-left";
                
                if (!isSubmitted) {
                  buttonClass += isSelected 
                    ? " border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md" 
                    : " border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50 text-slate-600";
                } else {
                  if (isCorrect) {
                    buttonClass += " border-emerald-500 bg-emerald-50 text-emerald-700";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += " border-rose-500 bg-rose-50 text-rose-700";
                  } else {
                    buttonClass += " border-slate-100 bg-white opacity-50 text-slate-400";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isSubmitted}
                    className={buttonClass}
                  >
                    <span>{option.text}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 size={24} className="text-emerald-500" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle size={24} className="text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOptionId}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg",
                    selectedOptionId 
                      ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700" 
                      : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  )}
                >
                  提交答案
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  {currentIndex === totalQuestions - 1 ? "查看结果" : "下一题"}
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Explanation Card */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className={cn(
                  "px-8 py-4 flex items-center gap-2 text-white font-bold",
                  selectedOptionId === currentQuestion.correctOptionId ? "bg-emerald-500" : "bg-rose-500"
                )}>
                  <Info size={20} />
                  {selectedOptionId === currentQuestion.correctOptionId ? "太棒了！回答正确。" : "别灰心，看看解析吧。"}
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">语法规则</h3>
                      <p className="text-lg text-slate-700 leading-relaxed mb-6">
                        {currentQuestion.explanation.rule}
                      </p>
                      
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">例句</h3>
                      <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-500 italic text-slate-600">
                        "{currentQuestion.explanation.example}"
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">常见错误</h3>
                      <p className="text-slate-600 mb-6">
                        {currentQuestion.explanation.commonMistake}
                      </p>

                      {currentQuestion.explanation.reviewLink && (
                        <a 
                          href={currentQuestion.explanation.reviewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                        >
                          了解更多语法知识
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer / Stats */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
        <p>© 2024 语法大闯关互动学习系统。专为英语学习者打造。</p>
      </footer>
    </div>
  );
}
