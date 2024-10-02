"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  BarChart2,
  PieChart,
  BookOpen,
  Scale,
  CheckCircle,
  Tags,
  TrendingUp,
  Maximize2,
  Minimize2,
  Brain,
  Cpu,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const AbstractShape = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.4,42.2C65.4,55.2,55,66.7,42.2,74.6C29.4,82.5,14.7,86.9,0.4,86.2C-13.9,85.5,-27.8,79.8,-40.6,71.9C-53.3,64,-65,53.9,-73.9,41.2C-82.8,28.5,-89,14.2,-88.2,0.5C-87.4,-13.3,-79.6,-26.6,-70.8,-38.3C-62,-50,-52.2,-60.1,-40.4,-68.7C-28.6,-77.3,-14.3,-84.3,0.9,-85.8C16.1,-87.3,32.2,-83.3,44.7,-76.4Z"
      transform="translate(100 100)"
    />
  </svg>
);

export default function AINewsAnalyzer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [topics, setTopics] = useState([]);
  const [entities, setEntities] = useState([]);
  const [conciseness, setConciseness] = useState(50);
  const [detailLevel, setDetailLevel] = useState(50);
  const [readability, setReadability] = useState(null);
  const [bias, setBias] = useState(null);
  const [factCheckSuggestions, setFactCheckSuggestions] = useState([]);
  const [contentClassification, setContentClassification] = useState([]);


  const analyzeText = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, conciseness, detailLevel }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      const data = await response.json();
      setSummary(data.summary);
      setSentiment(data.sentiment);
      setTopics(data.topics);
      setEntities(data.entities);
      setReadability(data.readability);
      setBias(data.bias);
      setFactCheckSuggestions(data.factCheckSuggestions);
      setContentClassification(data.contentClassification);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTopics((prev) =>
        prev.map((topic) => ({ ...topic, relevance: Math.random() }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black"></div>

      <AbstractShape className="absolute top-0 left-0 w-96 h-96 text-blue-500/10 animate-pulse" />
      <AbstractShape className="absolute bottom-0 right-0 w-96 h-96 text-purple-500/10 animate-pulse" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          NexusInsight AI
        </motion.h1>

        <Card className="bg-gray-900/30 border-gray-800 mb-8 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter article URL or paste text"
                className="bg-gray-800/50 border-gray-700 text-white flex-grow"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                className={`bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${
                  isAnalyzing ? "animate-pulse" : ""
                }`}
                onClick={analyzeText}
                disabled={isAnalyzing || !inputText.trim()}
              >
                {isAnalyzing ? "Analyzing" : "Analyze"}
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gray-900/30 border-gray-800 col-span-1 md:col-span-2 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="mr-2" />
                AI-Generated Summary
              </h2>
              <p className="text-gray-300 mb-4">
                {summary ||
                  "Your article summary will appear here, providing key insights and main points extracted from the text."}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Conciseness</span>
                  <Slider
                    value={[conciseness]}
                    onValueChange={(value) => setConciseness(value[0])}
                    max={100}
                    step={1}
                    className="w-1/2"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span>Detail Level</span>
                  <Slider
                    value={[detailLevel]}
                    onValueChange={(value) => setDetailLevel(value[0])}
                    max={100}
                    step={1}
                    className="w-1/2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cpu className="mr-2" />
                Sentiment Analysis
              </h2>
              {sentiment && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className={`bg-${sentiment.color}-900/50 text-${sentiment.color}-300`}
                    >
                      {sentiment.label}
                    </Badge>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                      <motion.div
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${sentiment.color}-500`}
                        initial={{ width: "0%" }}
                        animate={{ width: `${sentiment.score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dominant Emotions</h3>
                    <div className="flex flex-wrap gap-2">
                      {sentiment.emotions.map((emotion, index) => (
                        <Badge
                          key={index}
                          className={`bg-${emotion.color}-600`}
                        >
                          {emotion.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/30 border-gray-800 mb-8 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="topics">
              <TabsList className="grid text-black w-full grid-cols-3 mb-4">
                <TabsTrigger value="topics">
                  <PieChart className="mr-2 h-4 w-4" />
                  Key Topics
                </TabsTrigger>
                <TabsTrigger value="entities">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Named Entities
                </TabsTrigger>
                <TabsTrigger value="trends">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trend Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="topics">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold mb-2">{topic.name}</h3>
                      <motion.div
                        className="w-full bg-gray-700 rounded-full h-2.5"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div
                          className="bg-blue-600 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${topic.relevance * 100}%` }}
                          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="entities">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {entities.map((entity, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold mb-2">{entity.type}</h3>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {entity.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="trends">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dummyData}>
                      <XAxis dataKey="name" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-900/30 border-gray-800 mb-8 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Advanced Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="font-semibold mb-2 flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Readability Score
                      </h3>
                      {readability && (
                        <>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                              <motion.div
                                className="bg-green-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${readability.score}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                            <span>{readability.score}/100</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-2">
                            {readability.description}
                          </p>
                        </>
                      )}
                    </motion.div>
                    <motion.div
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Scale className="mr-2 h-4 w-4" />
                        Bias Detection
                      </h3>
                      {bias && (
                        <>
                          <Badge
                            className={`bg-${
                              bias.label === "left-leaning"
                                ? "blue"
                                : bias.label === "right-leaning"
                                ? "red"
                                : "yellow"
                            }-600`}
                          >
                            {bias.label}
                          </Badge>
                          <p className="text-sm text-gray-300 mt-2">
                            {bias.description}
                          </p>
                        </>
                      )}
                    </motion.div>
                    <motion.div
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Fact Check Suggestions
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {factCheckSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      className="bg-gray-800/50 p-4 rounded-lg"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Tags className="mr-2 h-4 w-4" />
                        Content Classification
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {contentClassification.map((classification, index) => (
                          <Badge key={index} className="bg-purple-600">
                            {classification}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="fixed bottom-8 right-8 bg-blue-600 rounded-full p-4 cursor-pointer z-50 hover:bg-blue-700 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className="h-6 w-6" />
          ) : (
            <Maximize2 className="h-6 w-6" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
