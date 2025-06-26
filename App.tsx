
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SECTIONS, DIAGNOSIS_RESULTS, TOTAL_QUESTIONS } from './constants';
import { Answers, Diagnosis, Section as SectionType } from './types';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { AccordionSection } from './components/AccordionSection';
import { QuestionGroup } from './components/QuestionGroup';
import { Results } from './components/Results';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [invalidSections, setInvalidSections] = useState<Set<number>>(new Set());
  const [diagnosisResult, setDiagnosisResult] = useState<Diagnosis | null>(null);
  const [showGlobalError, setShowGlobalError] = useState<boolean>(false);

  const completedQuestions = useMemo(() => Object.keys(answers).length, [answers]);

  const validateSections = useCallback(() => {
    const newCompletedSections = new Set<number>();
    SECTIONS.forEach(section => {
      const allQuestionsInSectionAnswered = section.questions.every(q => answers[q.name]);
      if (allQuestionsInSectionAnswered) {
        newCompletedSections.add(section.id);
      }
    });
    setCompletedSections(newCompletedSections);
    return newCompletedSections;
  }, [answers]);

  useEffect(() => {
    validateSections();
  }, [answers, validateSections]);

  const handleOptionChange = (name: string, value: string) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
    if (diagnosisResult) {
        setDiagnosisResult(null);
    }
    if(showGlobalError){
        setShowGlobalError(false);
        setInvalidSections(new Set());
    }
  };

  const handleToggleAccordion = (sectionId: number) => {
    setActiveSection(prev => (prev === sectionId ? null : sectionId));
  };
  
  useEffect(() => {
    // This effect handles auto-advancing to the next section when the current one is completed.
    if (activeSection === null) return;

    const currentSection = SECTIONS.find(s => s.id === activeSection);
    // Check if all questions in the current section are answered.
    // Added optional chaining to prevent runtime error if section/questions are not found.
    const isSectionComplete = currentSection?.questions?.every(q => !!answers[q.name]);
    
    if (isSectionComplete && activeSection < SECTIONS.length) {
      const timer = setTimeout(() => {
        setActiveSection(activeSection + 1);
      }, 300);
      // It's good practice to clean up timers.
      return () => clearTimeout(timer);
    }
  }, [answers, activeSection]);


  const calculateDiagnosis = () => {
    const validated = validateSections();
    if (validated.size < SECTIONS.length) {
      setShowGlobalError(true);
      const newInvalidSections = new Set<number>();
      SECTIONS.forEach(section => {
        if (!validated.has(section.id)) {
          newInvalidSections.add(section.id);
        }
      });
      setInvalidSections(newInvalidSections);
      return;
    }

    setShowGlobalError(false);
    setInvalidSections(new Set());

    // Diagnosis Logic
    const { distribution, honeycombing, traction, reticular, groundglass, additional, pleural } = answers;

    // 1. Check for Alternative Diagnosis
    if (
      distribution !== 'subpleural-basal' ||
      additional === 'cysts' || additional === 'mosaic' || additional === 'nodules' || additional === 'consolidation' ||
      groundglass === 'pure' ||
      pleural === 'plaques' || pleural === 'effusion'
    ) {
      setDiagnosisResult(DIAGNOSIS_RESULTS.ALTERNATIVE);
      return;
    }

    // 2. Check for Typical UIP
    if (distribution === 'subpleural-basal' && honeycombing === 'present') {
      setDiagnosisResult(DIAGNOSIS_RESULTS.UIP_TYPICAL);
      return;
    }
    
    // 3. Check for Probable UIP
    if (
      distribution === 'subpleural-basal' &&
      honeycombing === 'absent' &&
      reticular === 'prominent' &&
      traction === 'peripheral'
    ) {
      setDiagnosisResult(DIAGNOSIS_RESULTS.UIP_PROBABLE);
      return;
    }

    // 4. Default to Indeterminate
    setDiagnosisResult(DIAGNOSIS_RESULTS.INDETERMINATE);
  };
  
  const resetForm = () => {
    setAnswers({});
    setActiveSection(1);
    setCompletedSections(new Set());
    setInvalidSections(new Set());
    setDiagnosisResult(null);
    setShowGlobalError(false);
  };


  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden font-sans">
      <Header />
      <main className="p-4 sm:p-6 md:p-10">
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-blue-900">
          <h2 className="text-xl font-bold mb-3">Guide Interactif pour la Classification HRCT</h2>
          <p className="mb-4 text-base">
            Cet outil vous guide à travers les critères de classification de la fibrose pulmonaire idiopathique (FPI) sur un scanner thoracique (HRCT), conformément aux recommandations internationales de 2018.
          </p>
          <p className="mb-4">
            Veuillez répondre aux questions ci-dessous en analysant les images du scanner.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-md text-sm">
            <p><strong className="font-bold">Avertissement :</strong> Cet outil est un support éducatif et une aide à la classification. Il ne remplace en aucun cas le diagnostic posé par un médecin spécialiste ni l'avis d'une discussion multidisciplinaire. Une évaluation clinique complète du patient est indispensable.</p>
          </div>
        </div>

        <ProgressBar completed={completedQuestions} total={TOTAL_QUESTIONS} />
        
        {showGlobalError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg" role="alert">
            <p className="font-bold">⚠️ Formulaire incomplet</p>
            <p>Veuillez compléter toutes les sections avant de procéder à l'analyse.</p>
          </div>
        )}

        <div className="space-y-4">
          {SECTIONS.map((section: SectionType) => (
            <AccordionSection
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              isCompleted={completedSections.has(section.id)}
              isInvalid={invalidSections.has(section.id)}
              onToggle={() => handleToggleAccordion(section.id)}
            >
                {section.questions.map(question => (
                    <QuestionGroup
                        key={question.id}
                        question={question}
                        selectedValue={answers[question.name]}
                        onChange={handleOptionChange}
                    />
                ))}
            </AccordionSection>
          ))}
        </div>

        <div className="text-center mt-8">
            <button 
              className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out mx-2"
              onClick={calculateDiagnosis}
            >
              🔍 Analyser la Forme Scanographique
            </button>
            <button 
              className="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out mx-2 mt-4 sm:mt-0"
              onClick={resetForm}
            >
              🔄 Recommencer
            </button>
        </div>

        {diagnosisResult && <Results result={diagnosisResult} />}

      </main>
      <footer className="text-center text-xs text-gray-500 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
        © 2025 Application d'Aide au Diagnostic de la Fibrose pulmonaire, développée par Dr Zouhair Souissi
      </footer>
    </div>
  );
};

export default App;