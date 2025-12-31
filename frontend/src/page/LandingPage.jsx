import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex flex-col items-center justify-center px-4 relative overflow-hidden w-full'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className='relative z-10 flex flex-col items-center text-center max-w-4xl'>
        {/* Badge */}
        <div className="border-2 border-secondary w-fit text-center rounded-full px-6 py-3 mb-8 shadow-2xl bg-base-100/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
          <p className='text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse'>
            🎯 Build a habit
          </p>
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <h1 className='text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
            Welcome to
          </h1>
          <h1 className='text-7xl md:text-9xl montserrat-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-pulse'>
            CodeHer
          </h1>
        </div>

        {/* Description */}
        <p className='text-lg md:text-xl font-semibold text-base-content/80 mb-12 max-w-2xl leading-relaxed'>
          Practice daily, grow together. Your journey to coding excellence starts here.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/home"
            className='btn btn-lg text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce'
          >
            🚀 Start Coding Journey
          </Link>

      
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
          <div className="card bg-base-100/60 backdrop-blur-sm shadow-xl border border-base-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="card-body items-center text-center p-6">
              <div className="text-4xl mb-3 animate-bounce">💻</div>
              <h3 className="card-title text-lg">Interactive Coding</h3>
              <p className="text-sm text-base-content/70">Write, test, and debug code in real-time</p>
            </div>
          </div>

          <div className="card bg-base-100/60 backdrop-blur-sm shadow-xl border border-base-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="card-body items-center text-center p-6">
              <div className="text-4xl mb-3 animate-pulse">🏆</div>
              <h3 className="card-title text-lg">Track Progress</h3>
              <p className="text-sm text-base-content/70">Monitor your coding journey and achievements</p>
            </div>
          </div>

          <div className="card bg-base-100/60 backdrop-blur-sm shadow-xl border border-base-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="card-body items-center text-center p-6">
              <div className="text-4xl mb-3 animate-spin">🌟</div>
              <h3 className="card-title text-lg">Learn Together</h3>
              <p className="text-sm text-base-content/70">Join a community of passionate developers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
