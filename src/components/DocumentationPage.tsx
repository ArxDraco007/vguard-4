import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, FileText, Download, Play, Eye, Users, Target, Heart, Brain, Clock, Sparkles, Calendar, ExternalLink } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'

interface Module {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  presentations: Presentation[]
}

interface Presentation {
  id: string
  title: string
  type: 'presentation' | 'thinking-points'
  description: string
  fileUrl: string
  duration?: string
}

const coreModules: Module[] = [
  {
    id: 'day-zero',
    name: 'Day Zero',
    description: 'Foundation and orientation for the Vanguard journey',
    icon: Calendar,
    color: 'purple',
    presentations: [
      {
        id: 'day-zero-presentation',
        title: 'Day Zero Presentation',
        type: 'presentation',
        description: 'Foundation and orientation materials for the Vanguard program',
        fileUrl: 'https://drive.google.com/file/d/1BM93A5KLrSuBlTmWtqCcVMFZf5lZNeuK/view?usp=sharing',
        duration: '45 min'
      },
      {
        id: 'day-zero-thinking',
        title: 'Day Zero Thinking Points',
        type: 'thinking-points',
        description: 'Key reflection questions and discussion points for Day Zero',
        fileUrl: 'https://drive.google.com/file/d/1BM93A5KLrSuBlTmWtqCcVMFZf5lZNeuK/view?usp=sharing'
      }
    ]
  },
  {
    id: 'ethics',
    name: 'Ethics',
    description: 'Building moral foundations and ethical decision-making',
    icon: Target,
    color: 'red',
    presentations: [
      {
        id: 'ethics-presentation',
        title: 'Ethics Presentation',
        type: 'presentation',
        description: 'Core principles of ethical thinking and moral reasoning',
        fileUrl: 'https://drive.google.com/file/d/109caVK5VMl9qER-Lhda2Huw2vUn7ud8s/view?usp=sharing',
        duration: '50 min'
      },
      {
        id: 'ethics-thinking',
        title: 'Ethics Thinking Points',
        type: 'thinking-points',
        description: 'Reflection questions and ethical dilemmas for discussion',
        fileUrl: 'https://drive.google.com/file/d/109caVK5VMl9qER-Lhda2Huw2vUn7ud8s/view?usp=sharing'
      }
    ]
  },
  {
    id: 'empathy',
    name: 'Empathy',
    description: 'Developing emotional intelligence and understanding others',
    icon: Heart,
    color: 'pink',
    presentations: [
      {
        id: 'empathy-presentation',
        title: 'Empathy Presentation',
        type: 'presentation',
        description: 'Understanding empathy from psychological and practical perspectives',
        fileUrl: 'https://drive.google.com/file/d/1FfA0LY3pyA4y2hmV8zWHjude24ki-bi-/view?usp=sharing',
        duration: '45 min'
      },
      {
        id: 'empathy-thinking',
        title: 'Empathy Thinking Points',
        type: 'thinking-points',
        description: 'Exercises in perspective-taking and emotional awareness',
        fileUrl: 'https://drive.google.com/file/d/1FfA0LY3pyA4y2hmV8zWHjude24ki-bi-/view?usp=sharing'
      }
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Mastering effective verbal and non-verbal communication',
    icon: Users,
    color: 'blue',
    presentations: [
      {
        id: 'communication-presentation',
        title: 'Communication Presentation',
        type: 'presentation',
        description: 'Fundamentals of clear, persuasive, and impactful communication',
        fileUrl: 'https://drive.google.com/file/d/1yJMW3GO6MaeFwHYAqK6OgKIC_8qkDPZQ/view?usp=sharing',
        duration: '55 min'
      },
      {
        id: 'communication-thinking',
        title: 'Communication Thinking Points',
        type: 'thinking-points',
        description: 'Practice exercises and reflection on communication skills',
        fileUrl: 'https://drive.google.com/file/d/1yJMW3GO6MaeFwHYAqK6OgKIC_8qkDPZQ/view?usp=sharing'
      }
    ]
  },
  {
    id: 'thinking',
    name: 'Thinking',
    description: 'Developing critical thinking and problem-solving skills',
    icon: Brain,
    color: 'indigo',
    presentations: [
      {
        id: 'thinking-presentation',
        title: 'Thinking Presentation',
        type: 'presentation',
        description: 'Systematic approaches to analysis, evaluation, and reasoning',
        fileUrl: 'https://drive.google.com/file/d/1_b-OHk7x1EkDlSJpIqsUlQGzNBvGD66l/view?usp=sharing',
        duration: '50 min'
      },
      {
        id: 'thinking-thinking',
        title: 'Thinking Points',
        type: 'thinking-points',
        description: 'Problem-solving exercises and critical thinking challenges',
        fileUrl: 'https://drive.google.com/file/d/1_b-OHk7x1EkDlSJpIqsUlQGzNBvGD66l/view?usp=sharing'
      }
    ]
  },
  {
    id: 'time-management',
    name: 'Time Management',
    description: 'Optimizing productivity and work-life balance',
    icon: Clock,
    color: 'green',
    presentations: [
      {
        id: 'time-presentation',
        title: 'Time Management Presentation',
        type: 'presentation',
        description: 'Proven techniques for prioritization and efficiency',
        fileUrl: 'https://drive.google.com/file/d/1RXYEu9Yufy_Zpu1BbC8jvfZvFpKnpHG2/view?usp=sharing',
        duration: '40 min'
      },
      {
        id: 'time-thinking',
        title: 'Time Management Thinking Points',
        type: 'thinking-points',
        description: 'Personal productivity planning and reflection exercises',
        fileUrl: 'https://drive.google.com/file/d/1RXYEu9Yufy_Zpu1BbC8jvfZvFpKnpHG2/view?usp=sharing'
      }
    ]
  },
  {
    id: 'the-grand-spectrum',
    name: 'The Grand Spectrum',
    description: 'Comprehensive worldview and systems thinking',
    icon: Sparkles,
    color: 'yellow',
    presentations: [
      {
        id: 'spectrum-presentation',
        title: 'The Grand Spectrum Presentation',
        type: 'presentation',
        description: 'Holistic thinking and interconnected perspectives',
        fileUrl: 'https://drive.google.com/file/d/1ymsGpzMrTza-4GQeOGy7lb9bdExMW4K9/view?usp=sharing',
        duration: '65 min'
      },
      {
        id: 'spectrum-thinking',
        title: 'The Grand Spectrum Thinking Points',
        type: 'thinking-points',
        description: 'Systems mapping exercises and holistic thinking challenges',
        fileUrl: 'https://drive.google.com/file/d/1ymsGpzMrTza-4GQeOGy7lb9bdExMW4K9/view?usp=sharing'
      }
    ]
  }
]

const outsideCorePrograms = [
  {
    id: 'mentor-training',
    name: 'Mentor Training',
    description: 'Comprehensive training program for mentors and facilitators',
    icon: Users,
    color: 'cyan'
  }
]

export const DocumentationPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId?: string }>()
  const [selectedModule, setSelectedModule] = useState<Module | null>(
    moduleId ? coreModules.find(m => m.id === moduleId) || null : null
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, any> = {
      red: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', hover: 'hover:bg-red-500/30' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', hover: 'hover:bg-blue-500/30' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', hover: 'hover:bg-green-500/30' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', hover: 'hover:bg-yellow-500/30' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400', hover: 'hover:bg-purple-500/30' },
      pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/30', text: 'text-pink-400', hover: 'hover:bg-pink-500/30' },
      indigo: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400', hover: 'hover:bg-indigo-500/30' },
      orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', hover: 'hover:bg-orange-500/30' },
      teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/30', text: 'text-teal-400', hover: 'hover:bg-teal-500/30' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', hover: 'hover:bg-cyan-500/30' }
    }
    return colorMap[color] || colorMap.red
  }

  const convertToDirectDownloadLink = (driveUrl: string) => {
    const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`
    }
    return driveUrl
  }

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (selectedModule) {
    const colors = getColorClasses(selectedModule.color)
    
    return (
      <VanguardScene>
        <div className="min-h-screen bg-gradient-to-br from-black/20 via-red-900/10 to-black/30 backdrop-blur-sm">
          {/* Header */}
          <motion.div 
            className="bg-black/40 backdrop-blur-md shadow-2xl border-b border-red-500/20 sticky top-0 z-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedModule(null)}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold">Back to Documentation</span>
                </button>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${colors.bg} backdrop-blur-sm rounded-full flex items-center justify-center border ${colors.border}`}>
                    <selectedModule.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-lg">{selectedModule.name}</div>
                    <div className="text-sm text-gray-300">Core Program Module</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto px-6 py-16">
            {/* Module Overview */}
            <motion.div 
              className={`${colors.bg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${colors.border} mb-12`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-6 mb-6">
                <div className={`w-20 h-20 ${colors.bg} backdrop-blur-sm rounded-3xl flex items-center justify-center border ${colors.border}`}>
                  <selectedModule.icon className={`w-10 h-10 ${colors.text}`} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{selectedModule.name}</h1>
                  <p className="text-gray-300 text-lg">{selectedModule.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Presentations */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <FileText className="w-8 h-8 text-red-400" />
                Presentations & Materials
              </h2>

              {selectedModule.presentations.map((presentation, index) => (
                <motion.div
                  key={presentation.id}
                  className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-600/30 hover:border-red-500/30 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${presentation.type === 'presentation' ? 'bg-blue-500/20 border-blue-500/30' : 'bg-purple-500/20 border-purple-500/30'} backdrop-blur-sm rounded-2xl flex items-center justify-center border`}>
                        {presentation.type === 'presentation' ? (
                          <BookOpen className="w-6 h-6 text-blue-400" />
                        ) : (
                          <Brain className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{presentation.title}</h3>
                        <p className="text-gray-300 mb-2">{presentation.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            presentation.type === 'presentation' 
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          }`}>
                            {presentation.type === 'presentation' ? 'Presentation' : 'Thinking Points'}
                          </span>
                          {presentation.duration && (
                            <span className="text-gray-400 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {presentation.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => openInNewTab(presentation.fileUrl)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in Drive
                      </motion.button>
                      <motion.button
                        onClick={() => openInNewTab(convertToDirectDownloadLink(presentation.fileUrl))}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-xl hover:bg-green-600/30 transition-colors border border-green-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      ✅ Presentation file available on Google Drive (~75MB)
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </VanguardScene>
    )
  }

  return (
    <VanguardScene>
      <div className="min-h-screen bg-gradient-to-br from-black/20 via-red-900/10 to-black/30 backdrop-blur-sm">
        {/* Header */}
        <motion.div 
          className="bg-black/40 backdrop-blur-md shadow-2xl border-b border-red-500/20 sticky top-0 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 group">
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">Back to Home</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-500/30">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-white text-lg">Documentation</span>
                  <div className="text-sm text-blue-300">Program Materials & Resources</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="w-10 h-10 text-blue-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Documentation</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive program materials, presentations, and resources for the Vanguard leadership development journey.
            </p>
          </motion.div>

          {/* Core Program Section */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-12 flex items-center gap-4"
              variants={itemVariants}
            >
              <Target className="w-10 h-10 text-red-400" />
              Core Program
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreModules.map((module, index) => {
                const colors = getColorClasses(module.color)
                return (
                  <motion.button
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`${colors.bg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${colors.border} ${colors.hover} transition-all duration-300 text-left w-full`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-16 h-16 ${colors.bg} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border ${colors.border}`}>
                      <module.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{module.name}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{module.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${colors.text} font-semibold bg-black/20 px-3 py-1 rounded-full border border-gray-600/30`}>
                        {module.presentations.length} materials
                      </span>
                      <motion.div
                        className={`w-6 h-6 ${colors.text} opacity-70`}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Outside Core Program Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-12 flex items-center gap-4"
              variants={itemVariants}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
              Outside the Core Program
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...outsideCorePrograms, ...backFromVacationPrograms].map((program, index) => {
                const colors = getColorClasses(program.color)
                return (
                  (program as any).presentations ? (
                    <motion.button
                      key={program.id}
                      onClick={() => setSelectedModule(program)}
                      className={`${colors.bg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${colors.border} ${colors.hover} transition-all duration-300 text-left w-full`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-16 h-16 ${colors.bg} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border ${colors.border}`}>
                        <program.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{program.name}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{program.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${colors.text} font-semibold bg-black/20 px-3 py-1 rounded-full border border-gray-600/30`}>
                          {(program as any).presentations.length} materials
                        </span>
                        <motion.div
                          className={`w-6 h-6 ${colors.text} opacity-70`}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.button>
                  ) : (
                    <motion.div
                    key={program.id}
                    className={`${colors.bg} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${colors.border} transition-all duration-300`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`w-16 h-16 ${colors.bg} backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border ${colors.border}`}>
                      <program.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{program.name}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
                      <p className="text-yellow-400 text-sm">
                        Materials coming soon
                      </p>
                    </div>
                  </motion.div>
                  )
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}