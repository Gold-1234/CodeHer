import React from 'react'

export const FloatingSymbol = ({ delay, duration, size, top, left, symbol }) => {
  return (
    <span
      className="absolute text-white pointer-events-none select-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        fontSize: `${size}rem`,
        opacity: 0,
        animation: `floatFade ${duration}s ease-in-out ${delay}s infinite`,
		color: '#7472db'
      }}
    >
      {symbol}
    </span>
  );
};

export const FloatingBackground = () => {
	return (
		<>
			<FloatingSymbol symbol='{ }' top={10} left={10} fontSize={12} opacity={0.1} duration={10} delay={0} />
			<FloatingSymbol symbol='{ }' top={10} left={10} fontSize={12} opacity={2} duration={10} delay={1} />
			<FloatingSymbol symbol='export const( ) => {' top={80} left={20} fontSize={12} opacity={2} duration={10} delay={5}/>
			<FloatingSymbol symbol='export const( ) => {' top={80} left={20} fontSize={12} opacity={2} duration={10} delay={6}/>
			<FloatingSymbol symbol='async({name, email}) => {'
			top={40} left={80} fontSize={12} opacity={2} duration={10} delay={0}/>
			<FloatingSymbol symbol='->' top={10} left={60} fontSize={12} opacity={2} duration={10} delay={6}/>
			<FloatingSymbol symbol='->' top={10} left={60} fontSize={12} opacity={2} duration={10} delay={7}/>
			<FloatingSymbol symbol="&" top={90} left={90} fontSize={12} opacity={2} duration={10} delay={3}/>
		</>
	)
}


