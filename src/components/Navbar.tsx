import { FileText, BarChart3, Briefcase } from 'lucide-react';

interface NavbarProps {
  activeTab: 'input' | 'analysis' | 'applications';
  onTabChange: (tab: 'input' | 'analysis' | 'applications') => void;
}

export const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const tabs = [
    { id: 'input' as const, label: 'Ingresar Oferta', icon: FileText },
    { id: 'analysis' as const, label: 'Análisis', icon: BarChart3 },
    { id: 'applications' as const, label: 'Mis Aplicaciones', icon: Briefcase },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 font-medium transition-all
                  ${isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
