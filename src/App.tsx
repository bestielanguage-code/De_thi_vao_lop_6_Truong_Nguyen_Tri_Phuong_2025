import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Lock,
  Unlock,
  Zap,
  Award,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trophy,
} from "lucide-react";

// --- DATA EXTRACTION ---
const CLOZE_PASSAGE =
  "Healthy teeth help us look good and chew well. How can we (21) ___ our teeth healthy? Firstly, we should (22) ___ a dentist twice a year. Secondly, we should (23) ___ our teeth at least twice a day - once after breakfast in the morning, and once before (24) ___ to bed. Thirdly, we should eat food that is good (25) ___ our teeth and our body (26) ___ milk, fish, vegetables and (27) ___ fruit. Chocolate, sweets and biscuits are bad when we eat (28) ___ between meals. They are (29) ___ and (30) ___ cause decay. If you follow those tips, you will have clean and healthy teeth.";

const READING_PASSAGE =
  "Hi, my name's Andy. I love football. I am a great fan of Manchester United. I usually collect many pictures of my favourite football players. I really like their red shoes, but I can't buy them because they are expensive. Moreover, I am interested in cars. I'm crazy about driving cars and I also enjoy fixing them. When I was ten, I had many toy cars. Jackie, my best friend, had the same interest as me. We often played with toy cars after school. I sometimes repaired the ones Jackie broke. I also helped my dad fix his car. I wanted to become a mechanic and open up my own shop. My wish comes true now. My parents are happy that I have the job I really love. Besides, it's happier that Jackie and I plan to run the car shop together. I hope that we'll be successful in the future.";

const QUESTIONS = [
  // Part 1
  {
    id: 1,
    passage:
      "Last Sunday, my family went to visit our grandparents in a small village, about 20 kilometers from my city. It was also our weekend picnic. The weather was very nice. We had lunch outdoors and played a lot of games in the garden with beautiful flowers. My sister and I flew kites together. It was really our happy day!",
    question: "Đọc và chọn tiêu đề phù hợp nhất cho đoạn văn:",
    options: [
      "A. A Family's Party",
      "B. A Flower Garden",
      "C. An Outdoor Lunch",
      "D. A Family's Picnic",
    ],
    correct: 3,
  },
  {
    id: 2,
    passage:
      "Do you love going to the beach? There are many things you can do there. You can swim in the sea, play volleyball, or build sandcastles. If you are adventurous, you can try surfing or boating. In addition, walking along the shore will bring you a feeling of freedom. The beach is really a great place to have fun with your friends and family.",
    question: "Đọc và chọn tiêu đề phù hợp nhất cho đoạn văn:",
    options: [
      "A. Feeling of Freedom",
      "B. Fun Activities on the Beach",
      "C. Playing Sports on the Beach",
      "D. Swimming in the Sea",
    ],
    correct: 0,
  },
  {
    id: 3,
    passage:
      "Jack was very tired because he stayed up late watching a movie. In his first class, he tried to listen to the teacher, but his eyes were closed. Suddenly, he heard the teacher say, 'Jack, can you answer my question?' Jack woke up and said, 'Yes, I'll have some ice cream!' The whole class laughed a lot.",
    question: "Đọc và chọn tiêu đề phù hợp nhất cho đoạn văn:",
    options: [
      "A. Watching a Movie",
      "B. Waking up Late",
      "C. Eating in Class",
      "D. Sleeping in Class",
    ],
    correct: 3,
  },
  {
    id: 4,
    passage:
      "We need doctors when we are ill. Besides going to see doctors, there are things that you can do by yourself in the fight against illness, such as doing regular exercise, having a healthy diet and drinking more water. The more you follow these tips, the less you will see doctors.",
    question: "Đọc và chọn tiêu đề phù hợp nhất cho đoạn văn:",
    options: [
      "A. Some Tips on Healthy Eating",
      "B. How to Do Exercise Regularly",
      "C. Help Yourself to Stay Healthy",
      "D. The Importance of Drinking Water",
    ],
    correct: 2,
  },
  {
    id: 5,
    passage:
      "I love dancing and I practise it three times a week. I am going to be a famous ballet dancer when I grow up. I want to have performances in many countries in the world. I am going to hold a ballet club and work there until I am 75. I like planning my future. It is very exciting.",
    question: "Đọc và chọn tiêu đề phù hợp nhất cho đoạn văn:",
    options: [
      "A. My Country",
      "B. My Future Plan",
      "C. My Job",
      "D. My Exciting Week",
    ],
    correct: 1,
  },
  // Part 2
  {
    id: 6,
    question:
      "Chọn câu có nghĩa gần nhất: Having a trip to Sapa at this time of year is wonderful.",
    options: [
      "A. It is wonderful to have a trip to Sapa at this time of the year.",
      "B. Having a wonderful trip to Sapa is at this time of this year.",
      "C. This time of the year is wonderful in the trip to Sapa.",
      "D. This time of the year is not wonderful to have a trip to Sapa.",
    ],
    correct: 0,
  },
  {
    id: 7,
    question: "Chọn câu có nghĩa gần nhất: Hue's house is near the river.",
    options: [
      "A. Hue's house is not far from the river.",
      "B. Hue's house is far from the river.",
      "C. The river is far from Hue's house.",
      "D. The river is not close to Hue's house.",
    ],
    correct: 0,
  },
  {
    id: 8,
    question:
      "Chọn câu có nghĩa gần nhất: It is not good for you to eat fast food.",
    options: [
      "A. You cannot eat fast food.",
      "B. You should not eat fast food",
      "C. You will not eat fast food.",
      "D. You do not eat fast food.",
    ],
    correct: 1,
  },
  {
    id: 9,
    question: "Chọn câu có nghĩa gần nhất: Let's go to Lang Co Beach.",
    options: [
      "A. How about going to Lang Co Beach?",
      "B. Why aren't we going to Lang Co Beach?",
      "C. Why do we go to Lang Co Beach?",
      "D. How do we go to Lang Co Beach?",
    ],
    correct: 0,
  },
  {
    id: 10,
    question:
      "Chọn câu có nghĩa gần nhất: My father drove his car to work last Monday.",
    options: [
      "A. My father didn't drive his car to work last Monday.",
      "B. My father went to work by car last Monday.",
      "C. My father didn't go to work by car last Monday.",
      "D. My father drives to work by car on Monday.",
    ],
    correct: 1,
  },
  // Part 3
  {
    id: 11,
    question:
      "Chọn câu đúng nhất được viết từ gợi ý: Every day / Nam/go/school/bike/ but/today/he/ walk / school.",
    options: [
      "A. Every day Nam goes to school by bike but today he walks to school.",
      "B. Every day Nam goes to school by bike but today he is walking to school.",
      "C. Every day Nam is going to school by bike but today he is walking to school.",
      "D. Every day Nam is going to school by bike but today he walks to school.",
    ],
    correct: 1,
  },
  {
    id: 12,
    question:
      "Chọn câu đúng nhất được viết từ gợi ý: She / buy/comic book / bookshop/last Wednesday.",
    options: [
      "A. She bought a comic book from the bookshop last Wednesday.",
      "B. She buys a comic book at the bookshop last Wednesday.",
      "C. She bought a comic book to the bookshop last Wednesday.",
      "D. She buys a comic book in the bookshop last Wednesday.",
    ],
    correct: 0,
  },
  {
    id: 13,
    question:
      "Chọn câu đúng nhất được viết từ gợi ý: Tet / children/get/lot of /lucky money / grandparents.",
    options: [
      "A. At Tet, children get a lot of lucky money to my grandparents.",
      "B. At Tet, children gets a lot of lucky money from their grandparents.",
      "C. At Tet, children get a lot of lucky money from their grandparents.",
      "D. At Tet, children gets lot of lucky money from my grandparents.",
    ],
    correct: 2,
  },
  {
    id: 14,
    question:
      "Chọn câu đúng nhất được viết từ gợi ý: What / you / have / breakfast / this morning?",
    options: [
      "A. What do you have on breakfast this morning?",
      "B. What did you have on breakfast in this morning?",
      "C. What did you have for breakfast this morning?",
      "D. What did you have for breakfast in this morning?",
    ],
    correct: 2,
  },
  {
    id: 15,
    question:
      "Chọn câu đúng nhất được viết từ gợi ý: I/going/cinema/6 p.m. / Saturday.",
    options: [
      "A. I am going to go from the cinema at 6 p.m. Saturday.",
      "B. I am going to go to the cinema on 6 p.m. at Saturday.",
      "C. I am going to the cinema at 6 p.m. on Saturday.",
      "D. I am going to cinema on 6 p.m. on Saturday.",
    ],
    correct: 2,
  },
  // Part 4
  {
    id: 16,
    passage: READING_PASSAGE,
    question: "What does Andy mean when he says 'I'm crazy about driving'?",
    options: [
      "A. He dislikes driving.",
      "B. He loves driving.",
      "C. He doesn't mind driving.",
      "D. He hates driving.",
    ],
    correct: 1,
  },
  {
    id: 17,
    passage: READING_PASSAGE,
    question: "Who shared the hobby with Andy?",
    options: ["A. His dad", "B. No one", "C. His friend", "D. His parents"],
    correct: 2,
  },
  {
    id: 18,
    passage: READING_PASSAGE,
    question: "What did Jackie break?",
    options: [
      "A. Some of Andy's toy cars",
      "B. The picture of football players",
      "C. The car of Andy's father",
      "D. The red shoes of football players",
    ],
    correct: 0,
  },
  {
    id: 19,
    passage: READING_PASSAGE,
    question: "Which of the following statements is NOT TRUE?",
    options: [
      "A. Andy makes his parents pleased.",
      "B. Andy is a big football fan.",
      "C. Andy wishes a bright future.",
      "D. Andy has only one hobby.",
    ],
    correct: 3,
  },
  {
    id: 20,
    passage: READING_PASSAGE,
    question: "What is Andy's plan in the future?",
    options: [
      "A. He is going to run the car shop with Jackie.",
      "B. He plans to open up the car shop by himself.",
      "C. He will learn to become a good car mechanic.",
      "D. He is going to help Jackie's wish come true.",
    ],
    correct: 0,
  },
  // Part 5 (Cloze)
  {
    id: 21,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (21):",
    options: ["A. clean", "B. do", "C. brush", "D. keep"],
    correct: 3,
  },
  {
    id: 22,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (22):",
    options: ["A. look", "B. do", "C. see", "D. go"],
    correct: 2,
  },
  {
    id: 23,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (23):",
    options: ["A. take", "B. dry", "C. brush", "D. wash"],
    correct: 2,
  },
  {
    id: 24,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (24):",
    options: ["A. making", "B. doing", "C. sleeping", "D. going"],
    correct: 3,
  },
  {
    id: 25,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (25):",
    options: ["A. in", "B. at", "C. for", "D. to"],
    correct: 2,
  },
  {
    id: 26,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (26):",
    options: ["A. in all", "B. like", "C. at all", "D. such"],
    correct: 1,
  },
  {
    id: 27,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (27):",
    options: ["A. ill", "B. juice", "C. well", "D. fresh"],
    correct: 3,
  },
  {
    id: 28,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (28):",
    options: ["A. them", "B. us", "C. it", "D. him"],
    correct: 0,
  },
  {
    id: 29,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (29):",
    options: ["A. harmful", "B. good", "C. healthy", "D. useful"],
    correct: 0,
  },
  {
    id: 30,
    type: "cloze",
    passage: CLOZE_PASSAGE,
    question: "Điền vào chỗ trống (30):",
    options: ["A. easy", "B. easily", "C. ease", "D. to ease"],
    correct: 1,
  },
  // Part 6
  {
    id: 31,
    question: "Hoa, my best friend, speaks English ___",
    options: ["A. good", "B. bad", "C. well", "D. smart"],
    correct: 2,
  },
  {
    id: 32,
    question:
      "My hometown is great for outdoor activities ___ it has beautiful parks, sandy beaches and fine weather.",
    options: ["A. and", "B. so", "C. but", "D. because"],
    correct: 3,
  },
  {
    id: 33,
    question: "We play ___ every morning.",
    options: ["A. picnic", "B. jogging", "C. shopping", "D. table tennis"],
    correct: 3,
  },
  {
    id: 34,
    question: "Her friend has ___",
    options: [
      "A. big black eyes",
      "B. eyes big black",
      "C. black big eyes",
      "D. big eyes black",
    ],
    correct: 0,
  },
  {
    id: 35,
    question: "My mom ___ me to the park two days ago.",
    options: ["A. went", "B. gave", "C. took", "D. bought"],
    correct: 2,
  },
  {
    id: 36,
    question: "There isn't ___ milk in the fridge.",
    options: ["A. many", "B. any", "C. a", "D. some"],
    correct: 1,
  },
  {
    id: 37,
    question: "I like the style of ___ shoes. Do you have ___ in black?",
    options: ["A. that/it", "B. this/them", "C. these/ it", "D. those/them"],
    correct: 3,
  },
  {
    id: 38,
    question: "My lessons start at 7:30 a.m. from Monday ___ Friday.",
    options: ["A. of", "B. on", "C. by", "D. to"],
    correct: 3,
  },
  {
    id: 39,
    question: "Lan and her brother ___ at home last weekend.",
    options: ["A. aren't", "B. weren't", "C. isn't", "D. wasn't"],
    correct: 1,
  },
  {
    id: 40,
    question: "___ is the weather like today? - It's hot and sunny.",
    options: ["A. What", "B. How", "C. Where", "D. When"],
    correct: 0,
  },
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [coins, setCoins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [coinAnimation, setCoinAnimation] = useState(false);

  const UNLOCK_COST = 3000;
  const REWARD_IMAGE =
    "https://images.unsplash.com/photo-1695048064972-e5f8ceb0e50f?q=80&w=1000&auto=format&fit=crop"; // Cool iPhone Pro Max Creator Setup

  const q = QUESTIONS[currentIdx];
  const isUnlocked = coins >= UNLOCK_COST;

  const handleAnswer = (optionIdx) => {
    // Only allow answering once per question to prevent spamming coins
    if (answers[q.id] !== undefined) return;

    const isCorrect = optionIdx === q.correct;
    setAnswers((prev) => ({ ...prev, [q.id]: optionIdx }));

    if (isCorrect) {
      setCoins((prev) => prev + 100);
      triggerCoinAnim();
    }
  };

  const triggerCoinAnim = () => {
    setCoinAnimation(true);
    setTimeout(() => setCoinAnimation(false), 500);
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) setCurrentIdx((prev) => prev + 1);
  };

  const prevQuestion = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUESTIONS.forEach((question) => {
      if (answers[question.id] === question.correct) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const renderPassageText = () => {
    if (!q.passage) return null;

    if (q.type === "cloze") {
      // Highlight the active blank in the cloze passage
      const parts = q.passage.split(`(${q.id}) ___`);
      if (parts.length === 2) {
        return (
          <div className="text-slate-300 leading-relaxed text-lg">
            {parts[0]}
            <span className="inline-block bg-pink-500/20 text-pink-400 font-bold px-2 py-1 mx-1 rounded border border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-pulse">
              ({q.id}) ___
            </span>
            {parts[1]}
          </div>
        );
      }
    }
    return (
      <div className="text-slate-300 leading-relaxed text-lg">{q.passage}</div>
    );
  };

  if (showResult) {
    const correctCount = calculateScore();
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        <div className="max-w-2xl w-full bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>

          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />

          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">
            MISSION ACCOMPLISHED!
          </h1>
          <p className="text-slate-400 mb-8">
            Chúc mừng cô giáo tương lai đã hoàn thành thử thách!
          </p>

          <div className="flex justify-center gap-8 mb-10">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 w-40">
              <div className="text-slate-400 text-sm mb-2">Kết quả</div>
              <div className="text-3xl font-bold text-cyan-400">
                {correctCount}{" "}
                <span className="text-lg text-slate-500">/ 40</span>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 w-40">
              <div className="text-slate-400 text-sm mb-2">Tài sản</div>
              <div className="text-3xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                {coins} <Zap className="w-6 h-6" fill="currentColor" />
              </div>
            </div>
          </div>

          {isUnlocked ? (
            <div className="animate-fade-in-up">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 p-[2px] rounded-2xl mb-4">
                <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center">
                  <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <Unlock className="w-5 h-5" /> PHẦN THƯỞNG ĐÃ MỞ KHOÁ!
                  </h3>
                  <img
                    src="https://www.techone.vn/wp-content/uploads/2024/09/tita.jpg"
                    alt="Unlocked Reward"
                    className="w-full max-w-sm rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.3)] object-contain h-64 mb-4"
                  />
                  <p className="text-sm text-slate-300">
                    iPhone 16 Pro Max - Creator Edition. Chuẩn bị quay Vlog bùng
                    nổ trên Youtube & Substack thôi!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-rose-900 border-dashed">
              <Lock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">
                Rất tiếc! Bạn cần {UNLOCK_COST} 💎 để mở khoá phần thưởng bí
                mật.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Đạt IELTS 9.0 không khó, cày lại lần nữa chắc chắn được!
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setAnswers({});
              setCoins(0);
              setCurrentIdx(0);
              setShowResult(false);
            }}
            className="mt-8 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" /> CHƠI LẠI TỪ ĐẦU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col lg:flex-row bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      {/* LEFT PANEL - Reward & Stats (Shows top on mobile) */}
      <div className="w-full lg:w-80 bg-slate-900/50 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
            Nguyen Tri Phuong 2025 QUEST
          </h1>
          <div
            className={`flex items-center gap-2 text-2xl font-black text-yellow-400 transition-transform ${
              coinAnimation
                ? "scale-125 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                : ""
            }`}
          >
            {coins} <Zap className="w-6 h-6" fill="currentColor" />
          </div>
        </div>

        {/* Reward Box */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Mystery Drop
          </h3>
          <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/50 aspect-square flex flex-col items-center justify-center p-6 text-center transition-all hover:border-slate-600">
            {isUnlocked ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 animate-pulse"></div>
                <Unlock className="w-12 h-12 text-pink-400 mb-3 relative z-10" />
                <h4 className="text-lg font-bold text-pink-100 relative z-10">
                  UNLOCKED!
                </h4>
                <p className="text-xs text-pink-200/70 mt-2 relative z-10">
                  Hoàn thành bài để xem chi tiết
                </p>
              </>
            ) : (
              <>
                <Lock className="w-12 h-12 text-slate-600 mb-3" />
                <div className="w-full bg-slate-900 rounded-full h-2.5 mb-3 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((coins / UNLOCK_COST) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400">
                  Cần thêm {UNLOCK_COST - coins} 💎
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 text-center lg:text-left">
          <p className="text-xs text-slate-500">Tiến độ thi</p>
          <p className="text-lg font-bold text-cyan-400">
            {Object.keys(answers).length} / 40 đã hoàn thành
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Main Quiz Area */}
      <div className="flex-1 flex flex-col p-4 lg:p-10 h-[calc(100vh-200px)] lg:h-screen overflow-y-auto">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 overflow-x-auto pb-2 w-full max-w-3xl scrollbar-hide">
            {QUESTIONS.map((quest, idx) => {
              const status =
                answers[quest.id] !== undefined
                  ? answers[quest.id] === quest.correct
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : "bg-rose-500"
                  : "bg-slate-700";
              const isActive = currentIdx === idx;
              return (
                <div
                  key={quest.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2 min-w-[20px] flex-1 rounded-full cursor-pointer transition-all ${status} ${
                    isActive
                      ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex-1 max-w-4xl w-full mx-auto">
          {/* Passage Container */}
          {q.passage && (
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 mb-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-xs font-bold text-cyan-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Reading Section
              </h3>
              {renderPassageText()}
            </div>
          )}

          {/* Question Area */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cyan-500/20 text-cyan-400 font-bold px-3 py-1 rounded-lg border border-cyan-500/30">
                Câu {q.id}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-snug">
              {q.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {q.options.map((option, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isSelected = answers[q.id] === idx;
              const isCorrectOption = q.correct === idx;

              let btnClass =
                "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-300";

              if (isAnswered) {
                if (isCorrectOption) {
                  btnClass =
                    "bg-emerald-900/30 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                } else if (isSelected) {
                  btnClass = "bg-rose-900/30 border-rose-500 text-rose-200";
                } else {
                  btnClass =
                    "bg-slate-900/50 border-slate-800 text-slate-500 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`relative flex items-center justify-between p-5 rounded-xl border-2 text-left font-medium transition-all duration-300 ${btnClass} ${
                    !isAnswered
                      ? "active:scale-95 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 ml-3" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 ml-3" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-auto max-w-4xl w-full mx-auto flex items-center justify-between pt-6 border-t border-slate-800/50">
          <button
            onClick={prevQuestion}
            disabled={currentIdx === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
              currentIdx === 0
                ? "opacity-30 cursor-not-allowed text-slate-500"
                : "text-slate-300 bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Trở lại
          </button>

          {currentIdx === QUESTIONS.length - 1 ? (
            <button
              onClick={() => setShowResult(true)}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            >
              NỘP BÀI <CheckCircle2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all"
            >
              Tiếp tục <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
