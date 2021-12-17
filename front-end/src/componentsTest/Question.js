//테스트 문제들 answer를 키밸류형태로 만들고 선택한 키값을 다음 문제의 question_id랑 일치하게해서 검색
export const question =  
    [{
        id: 1,
        question_id: "Nations",
        questionNum: "",
        question: "오늘,\n 어느나라로\n 여행가고 싶어요?",
        explain: "",
        answer: [{"close" : "가까운 나라로 후딱 다녀올래요"}, {"distant": "먼 나라로 날아갔다 올래요"}]
    },
    {
        id: 2,
        question_id: "close",
        questionNum: "",
        question: "오늘은 몇명에서\n 마시나요?",
        explain: "",
        answer: [{"many" : "여러명에서 달려요!"}, {"couple": "둘이 오붓하게 마셔요"}, {"single": "인생은 혼자지!"}]
    },
    {
        id: 3,
        question_id: "distant",
        questionNum: "",
        question: "오늘은 몇명에서\n 마시나요?",
        explain: "",
        answer: [{"many" : "여러명에서 달려요!"}, {"couple": "둘이 오붓하게 마셔요"}, {"single": "인생은 혼자지!"}]
    },
    {
        id: 4,
        question_id: "many",
        questionNum: "",
        question: "마시는 위치:\n 어디서 마실거예요?",
        explain: "",
        answer: [{"home" : "집밖은 위험해! 집에서"}, {"outside": "맛있는건 밖에서"}]
    },
    {
        id: 5,
        question_id: "couple",
        questionNum: "",
        question: "마시는 위치:\n 어디서 마실거예요?",
        explain: "",
        answer: [{"home" : "집밖은 위험해! 집에서"}, {"outside": "맛있는건 밖에서"}]
    },
    {
        id: 6,
        question_id: "single",
        questionNum: "",
        question: "마시는 위치:\n 어디서 마실거예요?",
        explain: "",
        answer: [{"home" : "집밖은 위험해! 집에서"}, {"outside": "맛있는건 밖에서"}]
    },
    {
        id: 7,
        question_id: "home",
        questionNum: "Q1",
        question: `좋아하는 맥주의\n *바디감은 무엇인가요?`,
        explain: `바디감은 입안에 머금은 맥주의 느낌을 뜻해요`,
        answer: [{LightBody: "가벼운 바디감"}, {MediumBody: "적당한 바디감"}, {FullBody: "무거운 바디감"}]
    },
    {
        id: 8,
        question_id: "outside",
        questionNum: "Q1",
        question: `좋아하는 맥주의\n *바디감은 무엇인가요?`,
        explain: `바디감은 입안에 머금은 맥주의 느낌을 뜻해요`,
        answer: [{LightBody: "가벼운 바디감"}, {MediumBody: "적당한 바디감"}, {FullBody: "무거운 바디감"}]
    },
    {
        id: 9,
        question_id: "LightBody",
        questionNum: "",
        question: "탄산이 있는\n 맥주를 좋아하시나요?",
        explain: "탄산음료같은 찐한 탄산을 좋아한다면 YES!",
        answer: [{crispy : "네"}, {Bitter: "아니요"}]
    },
    {
        id: 10,
        question_id: "crispy",
        questionNum: "",
        question: "청량감이 있는\n 맥주를 좋아하시나요?",
        explain: "",
        answer: [{"Lager" : "네"}, {"Pilsner": "아니요"}]
    },
    {
        id: 11,
        question_id: "FullBody",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        explain: "",
        answer: [{"Bock" : "네"}, {"Stout": "아니요"}]
    },
    {
        id: 12,
        question_id: "MediumBody",
        questionNum: "",
        question: "쌉쌀한맛의 맥주를\n 좋아하시나요?",
        explain: "",
        answer: [{Bitter : "네"},{Strong: "아니요"} ]
    },
    {
        id: 13,
        question_id: "Bitter",
        questionNum: "",
        question: "과일맛 맥주와\n 고소한맛 맥주 중\n 어느쪽을 더 좋아하시나요?",
        explain: "과일맛 맥주는 블랑, 고소한맛 맥주는 코젤 다크가 대표적이에요",
        answer: [{Fruity : "과일맛"},{"Dunkel" : "고소한맛"}]
    },
    {
        id: 14,
        question_id: "Fruity",
        questionNum: "",
        question: "쓴맛 맥주와\n 부드러운맛 맥주 중\n 어느 쪽으로 더 좋아하시나요?",
        explain: "",
        answer: [{Hoppy : "쓴맛"}, {"Weizen": "부드러운맛"}]
    },
    {
        id: 15,
        question_id: "Hoppy",
        questionNum: "",
        question: "쓴맛의 맥주를\n 좋아하시나요?",
        explain: "인생의 쓴맛을 쓴맛 맥주로 해소한다면 YES!!",
        answer: [{"Ale" : "네"}, {"IPA": "아니요"}]
    },
    {
        id: 16,
        question_id: "Strong",
        questionNum: "",
        question: "진한맛의 맥주를\n 좋아하시나요?",
        explain: "진~한 아메리카노를 좋아한다면 YES!!",
        answer: [{"Bock" : "네"}, {"Stout": "아니요"}]
    },
]