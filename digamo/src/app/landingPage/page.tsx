import HeaderNav from "../../../components/landing-page/Header";
import HeroSection from "../../../components/landing-page/HeroSection";
import FeatureSection from "../../../components/landing-page/FeaturesSection";
import StepSection from "../../../components/landing-page/StepSection";
import SamplesSection from "../../../components/landing-page/SamplesSections";

export default function landingPage() {
  return (
    <div className="min-h-screen w-screen flex flex-col overflow-x-hidden">
      <HeaderNav />
      <HeroSection />
      <FeatureSection />
      <StepSection />
      <SamplesSection />
    </div>
  );
}
