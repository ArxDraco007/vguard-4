import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, Square, Plus, Edit3, Trash2, Palette, Save, X } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'
import { defaultSessions, Session, ChecklistItem } from '../data/sessions'

export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(defaultSessions)
  const [showAddSession, setShowAddSession] = useState(false)
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null)
  
  const [newSession, setNewSession] = useState({
    name: '',
    description: ''
  })

  const colors = [
    { name: 'Red', value: 'red', bg: 'bg-red-500', text: 'text-red-400' },
    { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-400' },
    { name: 'Green', value: 'green', bg: 'bg-green-500', text: 'text-green-400' },
    { name: 'Blue', value: 'blue', bg: 'bg-blue-500', text: 'text-blue-400' },
    { name: 'Purple', value: 'purple', bg: 'bg-purple-500', text: 'text-purple-400' },
    { name: 'Pink', value: 'pink', bg: 'bg-pink-500', text: 'text-pink-400' },
    { name: 'Indigo', value: 'indigo', bg: 'bg-indigo-500', text: 'text-indigo-400' },
    { name: 'Gray', value: 'gray', bg: 'bg-gray-500', text: 'text-gray-400' }
  ]

  const toggleChecklistItem = (sessionId: string, itemId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          checklist: session.checklist.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                completed: !item.completed,
                updated_at: new Date().toISOString()
              }
            }
            return item
          })
        }
      }
      return session
    }))
  }

  const changeItemColor = (sessionId: string, itemId: string, color: ChecklistItem['color']) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          checklist: session.checklist.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                color,
                updated_at: new Date().toISOString()
              }
            }
            return item
          })
        }
      }
      return session
    }))
    setShowColorPicker(null)
  }

  const addChecklistItem = (sessionId: string, text: string) => {
    if (!text.trim()) return

    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      text: text.trim(),
      completed: false,
      color: 'blue',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          checklist: [...session.checklist, newItem],
          updated_at: new Date().toISOString()
        }
      }
      return session
    }))
  }

  const deleteChecklistItem = (sessionId: string, itemId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          checklist: session.checklist.filter(item => item.id !== itemId),
          updated_at: new Date().toISOString()
        }
      }
      return session
    }))
  }

  const addSession = () => {
    if (!newSession.name.trim()) return

    const session: Session = {
      id: `session-${Date.now()}`,
      name: newSession.name,
      description: newSession.description,
      checklist: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setSessions(prev => [...prev, session])
    setNewSession({ name: '', description: '' })
    setShowAddSession(false)
  }

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  const getColorClasses = (color: ChecklistItem['color']) => {
    const colorMap = {
      red: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', dot: 'bg-green-500' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500' },
      pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/30', text: 'text-pink-400', dot: 'bg-pink-500' },
      indigo: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400', dot: 'bg-indigo-500' },
      gray: { bg: 'bg-gray-500/20', border: 'border-gray-500/30', text: 'text-gray-400', dot: 'bg-gray-500' }
    }
    return colorMap[color]
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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 border border-green-500/30">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Sessions</h1>
                  <p className="text-xs text-green-300 uppercase tracking-wider font-semibold">
                    Interactive Checklists & Task Management
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowAddSession(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/80 text-white rounded-xl hover:bg-green-500/80 transition-colors border border-green-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Add Session
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{session.name}</h2>
                    <p className="text-gray-300">{session.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSession(session)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <AnimatePresence>
                    {session.checklist.map((item, itemIndex) => {
                      const colorClasses = getColorClasses(item.color)
                      return (
                        <motion.div
                          key={item.id}
                          className={`${colorClasses.bg} backdrop-blur-sm rounded-2xl p-4 border ${colorClasses.border} transition-all duration-300`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() => toggleChecklistItem(session.id, item.id)}
                              className="flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {item.completed ? (
                                <CheckSquare className={`w-6 h-6 ${colorClasses.text}`} />
                              ) : (
                                <Square className={`w-6 h-6 ${colorClasses.text}`} />
                              )}
                            </motion.button>
                            
                            <div className="flex-1">
                              <p className={`${item.completed ? 'line-through opacity-60' : ''} text-white font-medium`}>
                                {item.text}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <button
                                  onClick={() => setShowColorPicker(showColorPicker === item.id ? null : item.id)}
                                  className={`w-4 h-4 ${colorClasses.dot} rounded-full border-2 border-white/20 hover:scale-110 transition-transform`}
                                />
                                
                                <AnimatePresence>
                                  {showColorPicker === item.id && (
                                    <motion.div
                                      className="absolute right-0 top-6 bg-black/90 backdrop-blur-xl rounded-2xl p-3 border border-gray-600/30 z-10"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                      <div className="grid grid-cols-4 gap-2">
                                        {colors.map(color => (
                                          <button
                                            key={color.value}
                                            onClick={() => changeItemColor(session.id, item.id, color.value as ChecklistItem['color'])}
                                            className={`w-6 h-6 ${color.bg} rounded-full hover:scale-110 transition-transform border-2 ${item.color === color.value ? 'border-white' : 'border-white/20'}`}
                                            title={color.name}
                                          />
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              
                              <button
                                onClick={() => deleteChecklistItem(session.id, item.id)}
                                className="p-1 hover:bg-red-500/20 rounded text-red-400 opacity-60 hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* Add Item */}
                <div className="border-t border-gray-600/30 pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new checklist item..."
                      className="flex-1 px-4 py-2 bg-black/40 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addChecklistItem(session.id, e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                        addChecklistItem(session.id, input.value)
                        input.value = ''
                      }}
                      className="px-4 py-2 bg-green-600/80 text-white rounded-xl hover:bg-green-500/80 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4 pt-4 border-t border-gray-600/30">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{session.checklist.filter(item => item.completed).length} / {session.checklist.length}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: session.checklist.length > 0 
                          ? `${(session.checklist.filter(item => item.completed).length / session.checklist.length) * 100}%`
                          : '0%'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Session Modal */}
        <AnimatePresence>
          {showAddSession && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-green-500/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add New Session</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Session Name</label>
                    <input
                      type="text"
                      value={newSession.name}
                      onChange={(e) => setNewSession({...newSession, name: e.target.value})}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-green-500/50"
                      placeholder="Enter session name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                    <textarea
                      value={newSession.description}
                      onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-green-500/50 resize-none"
                      rows={3}
                      placeholder="Brief description of the session"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowAddSession(false)}
                    className="flex-1 px-4 py-3 border border-gray-600/30 text-gray-300 rounded-xl hover:bg-gray-600/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addSession}
                    className="flex-1 px-4 py-3 bg-green-600/80 text-white rounded-xl hover:bg-green-500/80 transition-colors"
                  >
                    Add Session
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </VanguardScene>
  )
}