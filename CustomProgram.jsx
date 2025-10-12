import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Zap, ArrowLeft, Search, Dumbbell } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { availableExercises } from '../mock';
import { toast } from '../hooks/use-toast';

const CustomProgram = () => {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Mobility'];

  const filteredExercises = availableExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      tempId: Date.now(),
      sets: 3,
      reps: '10'
    };
    setSelectedExercises([...selectedExercises, newExercise]);
    toast({
      title: "Exercise Added",
      description: `${exercise.name} has been added to your program`,
    });
  };

  const removeExercise = (tempId) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.tempId !== tempId));
  };

  const updateExercise = (tempId, field, value) => {
    setSelectedExercises(selectedExercises.map(ex => 
      ex.tempId === tempId ? { ...ex, [field]: value } : ex
    ));
  };

  const saveProgram = () => {
    if (!programName.trim()) {
      toast({
        title: "Program Name Required",
        description: "Please enter a name for your program",
        variant: "destructive"
      });
      return;
    }

    if (selectedExercises.length === 0) {
      toast({
        title: "Add Exercises",
        description: "Please add at least one exercise to your program",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage (mock backend)
    const customPrograms = JSON.parse(localStorage.getItem('customPrograms') || '[]');
    const newProgram = {
      id: Date.now(),
      name: programName,
      exercises: selectedExercises,
      createdAt: new Date().toISOString()
    };
    customPrograms.push(newProgram);
    localStorage.setItem('customPrograms', JSON.stringify(customPrograms));

    toast({
      title: "Program Saved!",
      description: `${programName} has been saved successfully`,
    });

    // Reset form
    setProgramName('');
    setSelectedExercises([]);
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
                onClick={() => navigate('/')}
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
              onClick={() => navigate('/programs')}
              className="border-green-500 text-green-400 hover:bg-green-500/10"
              variant="outline"
            >
              View Programs
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Build Your <span className="text-green-400">Custom Program</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Create a personalized workout program tailored to your goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exercise Library */}
          <div>
            <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Exercise Library</CardTitle>
                <CardDescription className="text-gray-400">
                  Select exercises to add to your program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search exercises..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-black border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
                    />
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-black border-green-500/30 text-white">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-green-500/30">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat} className="text-white hover:bg-green-500/10">
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Exercise List */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredExercises.map((exercise) => (
                    <Card 
                      key={exercise.id}
                      className="bg-black border-green-500/20 hover:border-green-500/50 transition-all cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={exercise.image} 
                            alt={exercise.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1 group-hover:text-green-400 transition-colors">
                              {exercise.name}
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                                {exercise.category}
                              </Badge>
                              <Badge variant="outline" className="border-gray-500/30 text-gray-400 text-xs">
                                {exercise.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addExercise(exercise)}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Builder */}
          <div>
            <Card className="bg-gray-900/50 border-green-500/20 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Your Program</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your custom workout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Program Name */}
                <div className="space-y-2">
                  <Label htmlFor="programName" className="text-white">Program Name</Label>
                  <Input
                    id="programName"
                    placeholder="e.g., My Upper Body Blast"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className="bg-black border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
                  />
                </div>

                {/* Selected Exercises */}
                <div className="space-y-2">
                  <Label className="text-white">Exercises ({selectedExercises.length})</Label>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {selectedExercises.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No exercises added yet</p>
                        <p className="text-sm">Select exercises from the library</p>
                      </div>
                    ) : (
                      selectedExercises.map((exercise) => (
                        <Card key={exercise.tempId} className="bg-black border-green-500/20">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <img 
                                src={exercise.image} 
                                alt={exercise.name}
                                className="w-16 h-16 rounded object-cover"
                              />
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="text-white font-semibold text-sm">{exercise.name}</h4>
                                    <p className="text-gray-400 text-xs">{exercise.muscleGroup}</p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeExercise(exercise.tempId)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label className="text-xs text-gray-400">Sets</Label>
                                    <Input
                                      type="number"
                                      value={exercise.sets}
                                      onChange={(e) => updateExercise(exercise.tempId, 'sets', e.target.value)}
                                      className="bg-gray-900 border-green-500/20 text-white h-8 text-sm"
                                      min="1"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs text-gray-400">Reps</Label>
                                    <Input
                                      value={exercise.reps}
                                      onChange={(e) => updateExercise(exercise.tempId, 'reps', e.target.value)}
                                      className="bg-gray-900 border-green-500/20 text-white h-8 text-sm"
                                      placeholder="e.g., 8-10"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={saveProgram}
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                  disabled={selectedExercises.length === 0 || !programName.trim()}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProgram;

