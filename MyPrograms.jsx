import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Trash2, Calendar, Zap, ArrowLeft, Eye, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from '../hooks/use-toast';

const MyPrograms = () => {
  const navigate = useNavigate();
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    // Load saved programs from localStorage
    const programs = JSON.parse(localStorage.getItem('customPrograms') || '[]');
    setSavedPrograms(programs);
  }, []);

  const deleteProgram = (programId) => {
    const updatedPrograms = savedPrograms.filter(p => p.id !== programId);
    localStorage.setItem('customPrograms', JSON.stringify(updatedPrograms));
    setSavedPrograms(updatedPrograms);
    setSelectedProgram(null);
    toast({
      title: "Program Deleted",
      description: "Your program has been removed",
    });
  };

  const viewProgram = (program) => {
    setSelectedProgram(program);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                onClick={() => selectedProgram ? setSelectedProgram(null) : navigate('/')}
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
              onClick={() => navigate('/custom-program')}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {!selectedProgram ? (
          // Programs List
          <>
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4">
                My <span className="text-green-400">Custom Programs</span>
              </h1>
              <p className="text-gray-400 text-lg">
                View and manage your personalized workout programs
              </p>
            </div>

            {savedPrograms.length === 0 ? (
              <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm">
                <CardContent className="py-16">
                  <div className="text-center">
                    <Dumbbell className="w-16 h-16 mx-auto mb-4 text-green-400 opacity-30" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Programs Yet</h3>
                    <p className="text-gray-400 mb-6">Create your first custom workout program to get started</p>
                    <Button
                      onClick={() => navigate('/custom-program')}
                      className="bg-green-500 hover:bg-green-600 text-black font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Program
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPrograms.map((program) => (
                  <Card
                    key={program.id}
                    className="bg-gray-900/50 border-green-500/20 hover:border-green-500/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-white text-2xl mb-2">{program.name}</CardTitle>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>Created {formatDate(program.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Dumbbell className="w-4 h-4 text-green-400" />
                          <span className="text-sm">{program.exercises.length} Exercises</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => viewProgram(program)}
                            className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteProgram(program.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          // Program Detail View
          <>
            <div className="mb-12">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                Custom Program
              </Badge>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-5xl font-bold mb-2">{selectedProgram.name}</h1>
                  <p className="text-gray-400">Created on {formatDate(selectedProgram.createdAt)}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => deleteProgram(selectedProgram.id)}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Program
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {selectedProgram.exercises.map((exercise, index) => (
                <Card
                  key={exercise.tempId}
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
                            <CardTitle className="text-white text-2xl mb-3">{exercise.name}</CardTitle>
                            <div className="flex flex-wrap gap-3">
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                {exercise.sets} Sets
                              </Badge>
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                {exercise.reps} Reps
                              </Badge>
                              <Badge variant="outline" className="border-gray-500/30 text-gray-400">
                                {exercise.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Dumbbell className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 space-y-3">
                        <div>
                          <h3 className="text-green-400 font-semibold mb-1">Target Muscle</h3>
                          <p className="text-white">{exercise.muscleGroup}</p>
                        </div>
                        <div>
                          <h3 className="text-green-400 font-semibold mb-1">Equipment</h3>
                          <p className="text-gray-400">{exercise.equipment}</p>
                        </div>
                        <div>
                          <h3 className="text-green-400 font-semibold mb-1">Difficulty</h3>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPrograms;

