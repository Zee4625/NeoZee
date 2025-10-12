import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, ChevronRight, Clock, Target, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { workoutPrograms } from '../mock';

const Programs = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };

  const handleBack = () => {
    if (selectedProgram) {
      setSelectedProgram(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-green-500/20 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBack}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold">ZeeHUB</span>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="border-green-500 text-green-400 hover:bg-green-500/10"
            >
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {!selectedProgram ? (
          // Programs List View
          <>
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4">
                7-Day <span className="text-green-400">Training Programs</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Complete weekly workout schedule with detailed exercise breakdowns and muscle group information
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workoutPrograms.map((program) => (
                <Card
                  key={program.id}
                  onClick={() => handleProgramClick(program)}
                  className="bg-gray-900/50 border-green-500/20 hover:border-green-500/60 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {program.day}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <CardTitle className="text-white text-2xl group-hover:text-green-400 transition-colors">
                      {program.focus}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Dumbbell className="w-4 h-4 text-green-400" />
                        <span className="text-sm">{program.exercises.length} Exercises</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-sm">45-60 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Intermediate to Advanced</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Program Detail View
          <>
            <div className="mb-12">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                {selectedProgram.day}
              </Badge>
              <h1 className="text-5xl font-bold mb-4">
                {selectedProgram.focus}
              </h1>
              <p className="text-gray-400 text-lg">
                Complete workout routine with detailed muscle group breakdowns and proper technique instructions
              </p>
            </div>

            <div className="space-y-6">
              {selectedProgram.exercises.map((exercise, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-green-500/20 hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Exercise Image */}
                    <div className="md:col-span-1">
                      <img 
                        src={exercise.image} 
                        alt={exercise.name}
                        className="w-full h-full object-cover min-h-[250px]"
                      />
                    </div>
                    
                    {/* Exercise Details */}
                    <div className="md:col-span-2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-2xl mb-3">
                              {exercise.name}
                            </CardTitle>
                            <div className="flex flex-wrap gap-3">
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                {exercise.sets} Sets
                              </Badge>
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                {exercise.reps} Reps
                              </Badge>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Dumbbell className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 space-y-4">
                        <div>
                          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Target Muscle Group
                          </h3>
                          <p className="text-white font-medium">{exercise.muscleGroup}</p>
                          <p className="text-gray-400 text-sm mt-1">{exercise.location}</p>
                        </div>
                        
                        <div className="border-t border-green-500/20 pt-4">
                          <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Proper Technique
                          </h3>
                          <p className="text-gray-300 leading-relaxed">{exercise.technique}</p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">Training Tips</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Rest 60-90 seconds between sets for optimal recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Focus on proper form over heavy weight to prevent injury</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Progressive overload: gradually increase weight or reps each week</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Stay hydrated and maintain proper breathing throughout exercises</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Programs;

