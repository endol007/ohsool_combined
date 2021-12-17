import React, { useEffect, useRef } from 'react';

//첫 컴포넌트 렌더링 시 함수 실행되지 않게 막는 함수
const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false); //처음에 didMount false로 설정

	useEffect(() => {
		if (didMount.current) func(); //두번째 실행부터 didMount.current가 true이므로 function 실행
		else didMount.current = true; //처음에 빠져나갈때 true로 변환
	}, deps);
};

export default useDidMountEffect;