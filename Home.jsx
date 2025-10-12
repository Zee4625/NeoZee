import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Target, Zap, Calendar, TrendingUp, Award, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { sports } from '../mock';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Expert Programs",
      description: "Detailed workout routines with muscle group breakdowns and proper techniques"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Sport-Specific Training",
      description: "Specialized programs for martial arts, team sports, and athletics"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Custom Programs",
      description: "Build your own personalized workout programs with our exercise library"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "7-Day Schedules",
      description: "Complete weekly plans covering all major muscle groups including recovery"
    }
  ];

  const stats = [
    { label: "Training Programs", value: "50+" },
    { label: "Exercise Database", value: "46+" },
    { label: "Sports Covered", value: "15+" },
    { label: "Success Rate", value: "95%" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/20 to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Elite Training Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Athletic Performance
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Master any sport with scientifically-designed training programs. Detailed exercise breakdowns, 
              muscle group education, and proven techniques for optimal results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/programs')}
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
              >
                <Dumbbell className="w-5 h-5 mr-2" />
                View Programs
              </Button>
              <Button 
                size="lg" 
                onClick={() => navigate('/custom-program')}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-6 text-lg transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Build Custom Program
              </Button>
            </div>
            
            <div className="mt-6">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate('/my-programs')}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                View My Saved Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-green-500/20 bg-green-500/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-green-400">ZeeHUB</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to excel in your athletic journey, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gray-900/50 border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 text-green-400">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Showcase */}
      <section className="py-24 bg-gradient-to-b from-black to-green-950/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Train for <span className="text-green-400">Any Sport</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Specialized training programs tailored to your athletic discipline
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport) => (
              <Card 
                key={sport.id}
                className="bg-gray-900/70 border-green-500/20 hover:border-green-500/60 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white text-2xl group-hover:text-green-400 transition-colors">
                      {sport.name}
                    </CardTitle>
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {sport.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 p-12 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="relative text-center">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Level Up?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Start your transformation today with our comprehensive training programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/programs')}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-10 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/my-programs')}
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-10 py-6 text-lg transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  My Programs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold">ZeeHUB</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 ZeeHUB Training Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

