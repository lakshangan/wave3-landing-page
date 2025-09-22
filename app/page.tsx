"use client"

import type React from "react"
import LogoLoop from "../components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ];
import TiltedCard from "./TiltedCard";

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button as UIButton } from "@/components/ui/button"
import { useRef, useState, useEffect, Suspense } from "react"
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { ToastAction } from "@/components/ui/toast"
import {
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ArrowUp,
  CheckCircle,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  MousePointer,
  Zap,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
// import { useFrame } from "@react-three/fiber"
import { useInView } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

function Enhanced3DScene() {
  return (
    <div className="w-full h-full">
      {/* Use the Spline React component instead of */}
      <Spline scene="https://prod.spline.design/JoDD0AQyTJJY4kJ5kgRUF6fA/scene.splinecode" />
    </div>
  );
}

// Custom hook to detect mobile devices
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Enhanced Preloader with subtle color
function EnhancedPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => {
          const increment = Math.random() * 15
          const newProgress = Math.min(prev + increment, 100)
          if (newProgress === 100) {
            setTimeout(onComplete, 300)
          }
          return newProgress
        })
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [progress, onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Image src="/wave3-logo.png" alt="Wave3 Logo" width={120} height={48} className="h-12 w-auto" />
      </motion.div>

      <div className="w-48 mb-4">
        <Progress
          value={progress}
          className="h-0.5 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-600"
        />
      </div>

      <motion.p
        className="text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </motion.div>
  )
}

// Enhanced Background with subtle colors and dark mode support
function EnhancedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/20"></div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating elements with subtle colors */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-blue-100/20 to-indigo-100/20 dark:from-blue-900/10 dark:to-indigo-900/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-100/15 to-purple-100/15 dark:from-indigo-900/10 dark:to-purple-900/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}


// Enhanced Scroll Progress with color
function EnhancedScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

// Website Creation Studio Component
function WebsiteCreationStudio() {
  const [activeDevice, setActiveDevice] = useState("desktop")
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildingStep, setBuildingStep] = useState(0)
  const [selectedWebsite, setSelectedWebsite] = useState(0)

  const buildingSteps = [
    {
      id: 0,
      title: "Planning",
      icon: "📋",
      description: "Understanding your vision",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 1,
      title: "Design",
      icon: "🎨",
      description: "Creating beautiful layouts",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Develop",
      icon: "⚡",
      description: "Building with modern tech",
      color: "from-green-500 to-emerald-500",
    },
    { id: 3, title: "Launch", icon: "🚀", description: "Going live successfully", color: "from-orange-500 to-red-500" },
  ]

  const websiteTypes = [
    {
      id: 0,
      title: "E-commerce Store",
      description: "Powerful online stores that convert",
      gradient: "from-emerald-400 via-blue-500 to-purple-600",
      features: ["Payment Integration", "Inventory Management", "Mobile Optimized", "SEO Ready"],
      metrics: { conversion: "+45%", sales: "$2.3M", users: "50K+" },
    },
    {
      id: 1,
      title: "Business Website",
      description: "Professional presence that impresses",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      features: ["Lead Generation", "Contact Forms", "Analytics", "Fast Loading"],
      metrics: { leads: "+180%", traffic: "25K", bounce: "-35%" },
    },
    {
      id: 2,
      title: "Portfolio Site",
      description: "Showcase your work beautifully",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      features: ["Gallery System", "Client Testimonials", "Blog Integration", "Social Media"],
      metrics: { inquiries: "+220%", views: "100K", engagement: "+85%" },
    },
  ]

  const techStack = [
    { name: "React", icon: "⚛️", color: "text-cyan-500" },
    { name: "Next.js", icon: "▲", color: "text-black" },
    { name: "TypeScript", icon: "📘", color: "text-blue-600" },
    { name: "Tailwind", icon: "🎨", color: "text-teal-500" },
    { name: "Node.js", icon: "🟢", color: "text-green-600" },
    { name: "MongoDB", icon: "🍃", color: "text-green-500" },
  ]

  useEffect(() => {
    if (isBuilding) {
      const interval = setInterval(() => {
        setBuildingStep((prev) => (prev + 1) % buildingSteps.length)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isBuilding, buildingSteps.length])

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/20">
      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 80 - 40, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.7, 0.5],
              opacity: [0.1, 0.3, 0.2, 0.1],
            }}
            transition={{
              duration: 15 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            {["</>", "{}", "[]", "()", "&&", "||", "=>", "++"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-2 border-blue-200 mb-8"
            whileHover={{ scale: 1.05, y: -3 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(99, 102, 241, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              💻
            </motion.div>
            <span className="text-lg font-semibold text-blue-700 ml-3">Website Creation Studio</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-gray-900 dark:text-white">We Build</span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              Amazing Websites
            </motion.span>
            <br />
            <span className="text-gray-900 dark:text-white">That Convert</span>
          </motion.h2>

          <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" whileHover={{ scale: 1.01 }}>
            From concept to launch, we create high-performing websites that not only look stunning but drive real
            business results with user-focused design.
          </motion.p>
        </motion.div>

        {/* Interactive Building Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Watch Us Build Your Website</h3>
            <motion.button
              onClick={() => setIsBuilding(!isBuilding)}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                isBuilding
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isBuilding ? "⏸️ Pause Building" : "▶️ Start Building"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {buildingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-500 ${
                  buildingStep === index && isBuilding
                    ? `bg-gradient-to-br ${step.color} text-white border-transparent shadow-2xl scale-105`
                    : "bg-white border-gray-200 hover:border-blue-300"
                }`}
                whileHover={{ y: -5, scale: 1.02 }}
                animate={
                  buildingStep === index && isBuilding
                    ? {
                        boxShadow: [
                          "0 0 30px rgba(59, 130, 246, 0.5)",
                          "0 0 50px rgba(59, 130, 246, 0.7)",
                          "0 0 30px rgba(59, 130, 246, 0.5)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="text-4xl mb-4 text-center"
                  animate={
                    buildingStep === index && isBuilding
                      ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  {step.icon}
                </motion.div>
                <h4
                  className={`text-xl font-bold mb-2 text-center ${
                    buildingStep === index && isBuilding ? "text-white" : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-center ${buildingStep === index && isBuilding ? "text-white/90" : "text-gray-600"}`}
                >
                  {step.description}
                </p>

                {/* Building animation */}
                {buildingStep === index && isBuilding && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Progress line */}
                {index < buildingSteps.length - 1 && (
                  <motion.div
                    className="absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 hidden md:block"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isBuilding && buildingStep > index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Website Types Showcase */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Website Types We Master</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Choose your website type to see our expertise in action</p>
          </div>

          {/* Website Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {websiteTypes.map((type, index) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedWebsite(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedWebsite === index
                    ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.title}
              </motion.button>
            ))}
          </div>

          {/* Website Preview */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            key={selectedWebsite}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* Website Mockup */}
            <div className="relative">
              <motion.div
                className={`h-96 rounded-2xl bg-gradient-to-br ${websiteTypes[selectedWebsite].gradient} relative overflow-hidden shadow-2xl`}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Browser Chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white/20 backdrop-blur-sm flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-4 h-4 bg-white/30 rounded-full"></div>
                </div>

                {/* Website Content */}
                <div className="absolute inset-0 pt-8 p-6 text-white">
                  {/* Header */}
                  <motion.div
                    className="flex items-center justify-between mb-6"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-20 h-6 bg-white/40 rounded"></div>
                    <div className="flex space-x-2">
                      <div className="w-12 h-4 bg-white/30 rounded"></div>
                      <div className="w-12 h-4 bg-white/30 rounded"></div>
                      <div className="w-12 h-4 bg-white/30 rounded"></div>
                    </div>
                  </motion.div>

                  {/* Hero Section */}
                  <motion.div
                    className="mb-6"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-3/4 h-4 bg-white/60 rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-white/40 rounded mb-4"></div>
                    <div className="w-24 h-8 bg-white/80 rounded"></div>
                  </motion.div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-12 bg-white/20 rounded"
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/20 rounded-full"
                    style={{
                      width: Math.random() * 20 + 5,
                      height: Math.random() * 20 + 5,
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 15, 0],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>

              {/* Device Frame */}
              <div className="absolute -bottom-4 -right-4 flex space-x-2">
                {["desktop", "tablet", "mobile"].map((device, index) => (
                  <motion.button
                    key={device}
                    onClick={() => setActiveDevice(device)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      activeDevice === device
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {device === "desktop" ? "💻" : device === "tablet" ? "📱" : "📱"}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Website Details */}
            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }}>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{websiteTypes[selectedWebsite].title}</h4>
                <p className="text-gray-600 text-lg">{websiteTypes[selectedWebsite].description}</p>
              </motion.div>

              {/* Features */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {websiteTypes[selectedWebsite].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                {/* <h5 className="font-semibold text-gray-900 mb-3">Real Results:</h5> */}
                {/* <div className="grid grid-cols-3 gap-4">
                  {Object.entries(websiteTypes[selectedWebsite].metrics).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-lg font-bold text-blue-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key}</div>
                    </motion.div>
                  ))}
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Web Gallery Section */}
      {/* Web Gallery Section */}
      <motion.section
        className="w-full py-16 sm:py-24 px-4 sm:px-6 bg-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Website Showcase
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              A minimalist gallery of websites we’ve crafted with creativity and precision.
            </p>
          </motion.div>

          {(() => {
            const projects = [
              { src: "/bayan.png", href: "https://banyangrowtokentest.vercel.app/" },
              { src: "/jayam.png", href: "https://jayaminstitute.vercel.app/" },
              { src: "/hackbeyondlimitsv1.png", href: "hbl-website.vercel.app" },
              { src: "/pixelpic.png", href: "https://example4.com" },
              { src: "/marketplace.png", href: "/hackbeyond.png" },
              { src: "/anonxpose.png", href: "/jayam.png" },
            ];
            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 block"
                    >
                      <Image
                        src={project.src}
                        alt={`Web project ${i + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-lg font-medium">View Project</span>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <UIButton />
                </div>
              </>
            );
          })()}
        </div>
      </motion.section>

        {/* Tech Stack */}
        {/* Responsive Tech Stack Loop Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 bg-transparent flex flex-col items-center justify-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Powered by Modern Technology</h3>
          <div className="w-full max-w-6xl px-2 sm:px-6 flex items-center justify-center">
            <div className="w-full" style={{ minHeight: '64px', position: 'relative', overflow: 'hidden' }}>
              <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={48}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Technology partners"
              />
            </div>
          </div>
        </section>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powered by Modern Technology</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">We use the latest and most reliable technologies</p>
          </div> */}

          {/*  */}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <motion.h3
                className="text-4xl font-bold mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Ready to Launch Your Website?
              </motion.h3>
              <p className="text-xl mb-8 opacity-90">
                Let's create a website that not only looks amazing but drives real business growth and success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UIButton className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                    🚀 Start Your Website Project
                  </UIButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UIButton
                    variant="outline"
                    className="border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    💬 Get Free Strategy Call
                  </UIButton>
                </motion.div>
              </div>

              <motion.p className="text-sm mt-6 opacity-80" whileHover={{ scale: 1.02 }}>
                ⚡ 2-4 week delivery • 🔄 Unlimited revisions • 📱 Mobile-first design • 🎯 SEO optimized
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
// Animated Counter with enhanced styling
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Enhanced Feature Item with interactions
function EnhancedFeatureItem({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:border-blue-200 transition-all duration-300 flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mt-2">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Service Card with interactions
function EnhancedServiceCard({
  title,
  description,
  features,
  index,
}: {
  title: string
  description: string
  features: string[]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="p-4 sm:p-6 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <motion.h3
          className="text-lg sm:text-xl font-medium mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{description}</p>

        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
            >
              <CheckCircle className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" />
              <span className="break-words">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Enhanced Project Card with interactions
function EnhancedProjectCard({
  title,
  category,
  description,
  index,
}: {
  title: string
  category: string
  description: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="p-4 sm:p-6 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="mb-3">
          <motion.span
            className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-medium bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.span>
        </div>
        <motion.h3
          className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>

        <motion.div
          className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 5 }}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Project
        </motion.div>
      </div>
    </motion.div>
  )
}

// Enhanced Testimonial Card
function EnhancedTestimonialCard({
  name,
  company,
  text,
  index,
}: {
  name: string
  company: string
  text: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="p-4 sm:p-6 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <motion.p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed italic" whileHover={{ scale: 1.02 }}>
          "{text}"
        </motion.p>
        <div className="flex items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-white font-medium text-xs sm:text-sm">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="min-w-0">
            <h4 className="text-gray-900 dark:text-gray-100 font-medium text-sm truncate">{name}</h4>
            <p className="text-blue-600 dark:text-blue-400 text-xs truncate">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Responsive Device Preview
function ResponsiveDevicePreview() {
  const [activeDevice, setActiveDevice] = useState("desktop")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-lg shadow-blue-50/50 dark:shadow-blue-900/20"
    >
      <div className="text-center mb-6 sm:mb-8">
        <motion.h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white mb-2" whileHover={{ scale: 1.02 }}>
          Responsive Design
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Perfect experience across all devices</p>
      </div>

      <div className="flex justify-center mb-6 sm:mb-8 space-x-2 sm:space-x-4">
        {[
          { id: "desktop", icon: Monitor, label: "Desktop" },
          { id: "tablet", icon: Tablet, label: "Tablet" },
          { id: "mobile", icon: Smartphone, label: "Mobile" },
        ].map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm ${
              activeDevice === id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:border-blue-200 dark:hover:border-blue-500"
            }`}
            onClick={() => setActiveDevice(id)}
          >
            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-medium hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="relative flex justify-center">
        <motion.div
          key={activeDevice}
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl ${
            activeDevice === "desktop"
              ? "w-full max-w-md sm:max-w-2xl aspect-video"
              : activeDevice === "tablet"
                ? "w-48 sm:w-80 aspect-[3/4]"
                : "w-32 sm:w-48 aspect-[9/16]"
          }`}
        >
          <div className="p-2 sm:p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="flex space-x-1">
                <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400" whileHover={{ scale: 1.2 }} />
                <motion.div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
                  whileHover={{ scale: 1.2 }}
                />
              </div>
              <div className="h-0.5 sm:h-1 w-8 sm:w-16 bg-gray-300 rounded-full"></div>
            </div>

            <div className="flex-1 flex flex-col space-y-1 sm:space-y-2">
              <motion.div
                className="h-1/4 bg-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              />
              <div className="flex-1 grid grid-cols-2 gap-1 sm:gap-2">
                <motion.div
                  className="bg-gray-200/70 rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#e5e7eb" }}
                />
                <motion.div
                  className="bg-gray-200/70 rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#e5e7eb" }}
                />
              </div>
              <motion.div
                className="h-4 sm:h-8 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Floating interaction indicators */}
        <motion.div
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-4 sm:h-4 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-3 sm:h-3 bg-indigo-500 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </div>

      <motion.div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300" whileHover={{ scale: 1.02 }}>
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 text-blue-500 dark:text-blue-400" />
        Optimized for all screen sizes
      </motion.div>
    </motion.div>
  )
}

// Enhanced Mobile Navigation
function EnhancedMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = ["About", "Services", "Work", "Contact"]

  return (
    <div className="md:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 z-50 rounded-b-2xl shadow-lg"
          >
            <nav className="flex flex-col p-6 space-y-4 items-center text-center">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="pt-4 border-t border-gray-100 dark:border-gray-800 w-full flex justify-center"
              >
                <UIButton className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Get Started
                </UIButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Mouse follower component
function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  )
}



export default function Wave3Landing() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const isMobile = useMobile()

  // Scroll-based animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>{loading && <EnhancedPreloader onComplete={() => setLoading(false)} />}</AnimatePresence>

  <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden relative">
        {/* Enhanced Background */}
        <EnhancedBackground />

        {/* Mouse Follower */}
        {!isMobile && <MouseFollower />}

        {/* Enhanced Scroll Progress */}
        <EnhancedScrollProgress />

        {/* Content */}
        <div className="relative z-20">
          {/* Enhanced Navbar - Fixed positioning */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 mx-auto max-w-4xl"
          >
            <motion.div
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-100 dark:border-gray-800 shadow-lg shadow-blue-50/50 dark:shadow-blue-900/20 px-4 sm:px-6 py-3 flex items-center justify-between"
              whileHover={{ scale: 1.01 }}
            >
              <motion.div className="flex items-center" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Image src="/wave3-logo.png" alt="Wave3" width={200} height={72} className="h-16 sm:h-20 w-auto" />
              </motion.div>
               
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <ThemeToggle />
                {["About", "Services", "Work"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UIButton
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg text-xs sm:text-sm px-3 sm:px-4"
                  >
                    Get Started
                  </UIButton>
                </motion.div>
              </div>

              <EnhancedMobileNav />
            </motion.div>
          </motion.nav>

          {/* Enhanced Hero Section */}
          <motion.section
            className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 px-4 sm:px-6"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Content */}
                <motion.div
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6 sm:mb-8"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mr-2" />
                    <span className="text-xs sm:text-sm text-blue-700 font-medium">Digital Innovation Agency</span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.span className="text-black dark:text-white" whileHover={{ scale: 1.02 }}>
                      Wave3
                    </motion.span>
                    <br />
                    <motion.span
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.02 }}
                    >
                      Digital Agency
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    We create digital experiences that matter. Clean, functional, and purposeful design for modern
                    businesses with a touch of innovation.
                    <br />
                    {/* If your business is not in online you are out of business */}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UIButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 group shadow-lg text-sm sm:text-base">
                        Start Project
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </UIButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UIButton
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                      >
                        View Work
                      </UIButton>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {[
                      { number: 150, suffix: "+", label: "Projects", color: "text-blue-600 dark:text-blue-400" },
                      { number: 98, suffix: "%", label: "Satisfaction", color: "text-indigo-600 dark:text-indigo-400" },
                      { number: 5, suffix: "+", label: "Years", color: "text-purple-600 dark:text-purple-400" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`text-xl sm:text-2xl lg:text-3xl font-medium ${stat.color} mb-1`}>
                          <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Content - Enhanced 3D Scene */}
                <motion.div
                  className="h-[300px] sm:h-[400px] lg:h-[500px] order-first lg:order-last"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Suspense
                    fallback={
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl animate-pulse flex items-center justify-center border border-blue-100">
                        <div className="text-blue-400 text-sm">Loading 3D Scene...</div>
                      </div>
                    }
                  >
                    <iframe
                      src="https://my.spline.design/tubes-JoDD0AQyTJJY4kJ5kgRUF6fA/"
                      frameBorder="0"
                      width="100%"
                      height="100%"
                      style={{ background: "transparent" }}
                      
                    />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Enhanced About Section */}
          <section className="py-16 sm:py-24 px-4 sm:px-6" id="about">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                <motion.h2 className="text-2xl sm:text-3xl font-light mb-4 text-black dark:text-white" whileHover={{ scale: 1.02 }}>
                  Why Wave3?
                </motion.h2>
                <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base" whileHover={{ scale: 1.01 }}>
                  We believe in simplicity, functionality, and creating digital experiences that truly serve their
                  purpose with modern aesthetics.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <EnhancedFeatureItem
                  icon={<Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />}
                  title="Clean Design"
                  description="Every element serves a purpose. We remove the unnecessary and focus on what matters most for your users with beautiful aesthetics."
                />
                <EnhancedFeatureItem
                  icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
                  title="Fast Performance"
                  description="Speed is essential. Our solutions are optimized for performance and built with modern technologies for lightning-fast experiences."
                />
                <EnhancedFeatureItem
                  icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
                  title="User Focused"
                  description="We design with your users in mind, creating intuitive experiences that convert visitors into customers through thoughtful interactions."
                />
                <EnhancedFeatureItem
                  icon={<MousePointer className="h-5 w-5 sm:h-6 sm:w-6" />}
                  title="Interactive Experience"
                  description="Engaging animations and micro-interactions that delight users while maintaining professional standards and accessibility."
                />
              </div>
            </div>
          </section>

          {/* Enhanced Services Section */}
                  <section
          className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 dark:from-blue-950/30 dark:to-indigo-950/20"
          id="services"
        >
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                          <motion.h2 className="text-2xl sm:text-3xl font-light mb-4 text-black dark:text-white" whileHover={{ scale: 1.02 }}>
            Services
          </motion.h2>
          <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base" whileHover={{ scale: 1.01 }}>
            Comprehensive digital solutions designed to help your business grow and succeed in the modern digital
            landscape.
          </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
                {[
                  {
                    title: "Web Development",
                    description:
                      "Custom websites and applications built with modern technologies and best practices for optimal performance.",
                    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure & Reliable"],
                  },
                  // {
                  //   title: "Mobile Apps",
                  //   description:
                  //     "Native and cross-platform mobile applications that engage users and drive business growth effectively.",
                  //   features: ["iOS & Android", "Cross-Platform", "App Store Ready", "Push Notifications"],
                  // },
                  {
                    title: "UI/UX Design",
                    description:
                      "User-centered design that creates meaningful experiences and drives conversions through thoughtful interfaces.",
                    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
                  },
                  {
                    title: "Visual Design & Posters",
                    description:
                      "Creative visual designs, posters, and branding materials that captivate audiences and communicate your message effectively.",
                    features: ["Poster Design", "Brand Identity", "Digital Art", "Print Materials"],
                  },
                   {
                    title: "Videography and Editing",
                    description:"At Wave3, we work with skilled videographers and editors within our network. We connect you with the right creatives to produce high-quality videos tailored to your brand.",
                    features: [ "Social Media Editing"],
                  },
                ].map((service, index) => (
                  <EnhancedServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    index={index}
                  />
                ))}
              </div>

              {/* Responsive Device Preview */}
              <ResponsiveDevicePreview />
            </div>
          </section>

          {/* Enhanced Work Section */}
          <section className="py-16 sm:py-24 px-4 sm:px-6" id="work">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                          <motion.h2 className="text-2xl sm:text-3xl font-light mb-4 text-black dark:text-white" whileHover={{ scale: 1.02 }}>
            Selected Work
          </motion.h2>
          <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base" whileHover={{ scale: 1.01 }}>
            A collection of projects that showcase our approach to digital design and development with modern
            aesthetics.
          </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "E-commerce Platform",
                    category: "Web Development",
                    description:
                      "Modern e-commerce solution with seamless user experience and advanced analytics dashboard.",
                  },
                  {
                    title: "Brand Identity",
                    category: "Design",
                    description: "Complete brand system with logo, guidelines, and digital application standards.",
                  },
                  {
                    title: "Portfolio website",
                    category: "UI/UX Design",
                    description: "Elegant portfolio showcase with creative layouts, smooth transitions, and optimized for highlighting creative work.",
                  },
                  {
                    title: "AI chatbot",
                    category: "Web Development",
                    description: "Intelligent AI chatbot solutions with natural language processing and seamless user interactions.",
                  },
                  {
                    title: "Blockchain Dapps",
                    category: "Blockchain Dapps Development",
                    description: "Decentralized applications built on blockchain technology with smart contracts, Web3 integration, and secure token management.",
                  },
                  //  {
                  //   title: "Restaurant App",
                  //   category: "web Development",
                  //   description: "Complete restaurant management system with ordering and real-time delivery tracking.",
                  // },
                ].map((project, index) => (
                  <EnhancedProjectCard
                    key={index}
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Website Creation Studio */}
          <WebsiteCreationStudio />

          {/* Visual Design Studio */}

          {/* Enhanced Testimonials Section */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-indigo-50/30 to-blue-50/20 dark:from-indigo-950/30 dark:to-blue-950/20">
            <div className="container mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                          <motion.h2 className="text-2xl sm:text-3xl font-light mb-4 text-black dark:text-white" whileHover={{ scale: 1.02 }}>
            The team
          </motion.h2>
          <motion.p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" whileHover={{ scale: 1.01 }}>
            People behind Wave3
          </motion.p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-8">
              {/* Demo TiltedCard for Kendrick Lamar - GNX */}
              <TiltedCard
                imageSrc="/ansar.png"
                altText="Ansar Hussain A - CEO & Founder"
                captionText="Ansar "
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    Ansar Hussain A - CEO & Founder
                  </p>
                }
              />
              {/* Second TiltedCard for another album */}
              <TiltedCard
                imageSrc="/pareekshit.png"
                altText="Pareekshith P - CTO & Co-Founder"
                captionText="Pareekshith P - CTO & Co-Founder"
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={10}
                scaleOnHover={1.15}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
Pareekshith P - CTO & Co-Founder                  </p>
                }
              />
            </div>
              </motion.div>

              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Pareekshith P",
                    company: "TechStart Inc",
                    text: "Wave3 delivered exactly what we needed. Clean, fast, and effective. Our conversion rate increased by 40% within the first month.",
                  },
                  {
                    name: "Ansar Hussain A",
                    company: "Local Bistro",
                    text: "The mobile app transformed our business completely. Simple to use for both customers and staff. Highly recommended for any business.",
                  },
                  // {
                  //   name: "Lakshan G",
                  //   company: "Creative Studio",
                  //   text: "Professional team with great attention to detail. They understood our vision perfectly and executed it with modern flair.",
                  // },
                ].map((testimonial, index) => (
                  <EnhancedTestimonialCard
                    key={index}
                    name={testimonial.name}
                    company={testimonial.company}
                    text={testimonial.text}
                    index={index}
                  />
                ))}
              </div> */}
            </div>
          </section>

          {/* Contact Info Section */}
          <section className="py-16 sm:py-24 px-4 sm:px-6" id="contact-info">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 sm:mb-16"
              >
                <motion.h2 className="text-2xl sm:text-3xl font-light mb-4 text-black dark:text-white" whileHover={{ scale: 1.02 }}>
                  Get In Touch
                </motion.h2>
                <motion.p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base" whileHover={{ scale: 1.01 }}>
                  Have questions? Reach out to us through any of these channels.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg dark:shadow-gray-900/30"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div>
                    <motion.h3 className="text-lg font-medium mb-6 text-black dark:text-white text-center" whileHover={{ scale: 1.02 }}>
                      Contact Info
                    </motion.h3>
                    <div className="space-y-4">
                      {[
                        { icon: <Mail className="h-4 w-4" />, text: "wave3devs@gmail.com", color: "text-blue-600 dark:text-blue-400" },
                        { icon: <Phone className="h-4 w-4" />, text: "+91 93441 22601", color: "text-indigo-600 dark:text-indigo-400" },
                        {
                          icon: <MapPin className="h-4 w-4" />,
                          text: "Remote & Worldwide",
                          color: "text-purple-600 dark:text-purple-400",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <div className={item.color}>{item.icon}</div>
                          <span className="text-gray-600 dark:text-gray-300 text-sm break-all">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <motion.h4 className="font-medium mb-4 text-black dark:text-white text-center" whileHover={{ x: 5 }}>
                      Follow Us
                    </motion.h4>
                    <div className="flex space-x-3">
                      {[
                        { icon: <Twitter className="h-4 w-4" />, color: "from-blue-500 to-blue-600" },
                        { icon: <Linkedin className="h-4 w-4" />, color: "from-blue-600 to-indigo-600" },
                        { icon: <Github className="h-4 w-4" />, color: "from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-500" },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-8 h-8 bg-gradient-to-br ${social.color} rounded flex items-center justify-center text-white shadow-lg transition-all`}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Footer */}
          <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50/30 to-indigo-50/20 dark:from-blue-950/30 dark:to-indigo-950/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.02 }}>
                  <Image src="/wave3-logo.png" alt="Wave3" width={60} height={24} className="h-4 w-auto" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">© 2024 Wave3. All rights reserved.</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UIButton
                    variant="outline"
                    size="sm"
                    className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <ArrowUp className="h-3 w-3 mr-2" />
                    Top
                  </UIButton>
                </motion.div>
              </div>
            </div>
          </footer>
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <UIButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-2xl shadow-blue-500/25 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Get your website now!
          </UIButton>
        </motion.div>
      </div>
    </>
  )
}