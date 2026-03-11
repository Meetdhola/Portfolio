import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import FounderStory from './components/FounderStory'
import Milestones from './components/Milestones'
import EduSkillX from './components/EduSkillX'
import TechOrbit from './components/TechOrbit'
import ProjectVault from './components/ProjectVault'
import AILab from './components/AILab'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import IntroSequence from './components/IntroSequence'
import './index.css'

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!introFinished && (
          <IntroSequence key="intro" onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <SmoothScroll>
          <div className="relative min-h-screen bg-brand-black text-white selection:bg-brand-cyan selection:text-brand-black font-primary">
            <CustomCursor />
            <Navbar />

            {/* Main Application Container */}
            {introFinished && (
              <main className="w-full">
                <Hero />
                <FounderStory />
                <Milestones />
                {/* <EduSkillX /> */}
                <TechOrbit />
                <ProjectVault />
                <AILab />
                <Contact />
              </main>
            )}
          </div>
        </SmoothScroll>
      </div>
    </>
  )
}

export default App
