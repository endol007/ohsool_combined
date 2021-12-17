import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

const TasteGraph = ({ beers }) => {
  const labels = ["쓴맛", "청량감", "향", "단맛", "고소한맛"]
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  
  useEffect(() => { //평점정보 불러오기
      if(beers) {
        //맛마다 평점 정보 받아오기
        setScores(Object.values(beers));
      }
  }, [beers]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "맥주맛평점", //그래프 위의 라벨
        data: scores, //맛 평점 표시
        backgroundColor: 'rgba(255, 196, 79, 0.5)', 
        borderColor: '#FFC44F',
        borderWidth: 3,
      },
    ],
  };
  
  const options = {
    scales: {
        angles: {
            display: false,
        },
        r: {
            max: 5, //그래프의 최대값
            min: 0, //그래프의 최소 값(중앙)
            ticks: {
                stepSize: 1, //그래프간격마다 점수
            }
        }
    },
  };
  return(
    <>
      <Radar data={data} options={options} />
    </>
  )
};

export default React.memo(TasteGraph);