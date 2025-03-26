import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { 
  FiPlus, 
  FiDroplet, 
  FiCloudRain, 
  FiEdit,
  FiSave,
  FiThermometer,
  FiSun,
  FiDatabase,
  FiInfo
} from 'react-icons/fi';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  body {
    background: #f8fafc;
    color: #1e293b;
  }
`;

const theme = {
  primary: '#2D6A4F',
  secondary: '#2563eb',
  accent: '#f59e0b',
  success: '#10b981',
  danger: '#ef4444',
  neutral: '#64748b',
  background: '#f8fafc',
  text: '#1e293b',
  textLight: '#f8fafc'
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${theme.primary} 0%, #1B4332 100%);
  border-radius: 12px;
  color: ${theme.textLight};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  h1 {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-weight: 600;
    font-size: 1.8rem;
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const ItemCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: ${theme.primary};
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.8rem;
    border: 2px solid #e2e8f0;
  }
`;

const ReservoirList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ReservoirItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0f2fe;
    transform: translateX(4px);
  }

  > div:first-child {
    width: 120px;
    font-weight: 500;
    color: ${theme.primary};
  }
`;

const WaterLevel = styled.div`
  height: 20px;
  width: 160px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.level}%;
    background: ${props => props.alert ? theme.danger : theme.secondary};
    transition: width 0.3s ease, background 0.3s ease;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  width: 90%;
  max-width: 500px;
  z-index: 100;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  background: ${theme.background};
  border-radius: 8px;
  margin: 0.8rem 0;
  border: 1px solid #e2e8f0;

  svg {
    flex-shrink: 0;
    color: ${theme.neutral};
    stroke-width: 1.5;
  }

  > div {
    flex-grow: 1;
    
    p {
      color: ${theme.text};
      margin-top: 0.4rem;
    }
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: ${theme.primary};
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 10px;

  &:hover {
    background: #245d48;
    transform: translateY(-1px);
  }
`;

function App() {
  const [inventory, setInventory] = useState([
    { 
      id: 1, 
      name: 'Tomatoes', 
      image: '/happy-tomato.jpeg',
      waterNeed: 5, 
      currentWater: 30,
      rainfallImpact: 65,
      soilMoisture: 40,
      notes: ''
    },
    { 
      id: 2, 
      name: 'Maize', 
      image: '/happy-maize2.jpeg',
      waterNeed: 8, 
      currentWater: 45,
      rainfallImpact: 80,
      soilMoisture: 60,
      notes: ''
    }
  ]);

  const [activeModal, setActiveModal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [aiNote, setAiNote] = useState('');
  const [weather] = useState({ temp: 25, condition: 'Sunny' });

  const handleSaveNote = (cropId) => {
    setInventory(inventory.map(crop => 
      crop.id === cropId ? {...crop, notes: aiNote} : crop
    ));
    setAiNote('');
    setEditing(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          <h1><FiDroplet /> KarooFarmer</h1>
        </Header>

        <ReservoirList style={{ marginBottom: '2rem' }}>
          <MetricItem>
            <FiCloudRain size={24} />
            <div>
              <h3>Current Weather</h3>
              <p>{weather.condition} | {weather.temp}°C</p>
            </div>
          </MetricItem>
          <MetricItem style={{ background: '#fff4e6' }}>
            <FiInfo size={24} />
            <div>
              <h3>AI Recommendation</h3>
              <p>Next week's forecast shows rain - consider reducing irrigation</p>
            </div>
          </MetricItem>
        </ReservoirList>

        <h2 style={{ color: theme.primary, marginBottom: '1rem' }}>Crop Inventory</h2>
        <InventoryGrid>
          {inventory.map(crop => (
            <ItemCard key={crop.id} onClick={() => setActiveModal({ type: 'crop', data: crop })}>
              <img src={crop.image} alt={crop.name} />
              <h3>{crop.name}</h3>
              <p>{crop.waterNeed}L/day</p>
            </ItemCard>
          ))}
          <ItemCard onClick={() => setActiveModal({ type: 'crop', data: null })}>
            <FiPlus size={24} />
            Add Crop
          </ItemCard>
        </InventoryGrid>

        <h2 style={{ color: theme.primary, margin: '2rem 0 1rem' }}>Water Management</h2>
        <ReservoirList>
          {inventory.map(crop => (
            <ReservoirItem key={crop.id} onClick={() => setActiveModal({ type: 'reservoir', data: crop })}>
              <div>{crop.name}</div>
              <WaterLevel level={(crop.currentWater / 50) * 100} alert={crop.currentWater < 20} />
              <div>{crop.currentWater}L remaining</div>
            </ReservoirItem>
          ))}
        </ReservoirList>

        {activeModal && (
          <>
            <ModalBackdrop onClick={() => {
              setActiveModal(null);
              setEditing(false);
            }} />
            <Modal>
              {activeModal.type === 'crop' ? (
                <>
                  <h2>{activeModal.data?.name || 'New Crop'}</h2>
                  
                  {activeModal.data && (
                    <>
                      <img 
                        src={activeModal.data.image} 
                        alt={activeModal.data.name} 
                        style={{ width: '100px', margin: '1rem 0' }}
                      />

                      <MetricItem>
                        <FiDroplet />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Water Reserve</span>
                            <strong>{activeModal.data.currentWater}L</strong>
                          </div>
                          <WaterLevel level={(activeModal.data.currentWater / 50) * 100} />
                        </div>
                      </MetricItem>

                      <MetricItem>
                        <FiThermometer />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Daily Need</span>
                            <strong>{activeModal.data.waterNeed}L/day</strong>
                          </div>
                        </div>
                      </MetricItem>

                      {editing ? (
                        <div style={{ marginTop: '1rem' }}>
                          <textarea
                            value={aiNote}
                            onChange={(e) => setAiNote(e.target.value)}
                            placeholder="Add notes for AI (e.g., 'Leaves wilting since Tuesday')"
                            style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
                          />
                          <Button 
                            onClick={() => handleSaveNote(activeModal.data?.id)}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <FiSave /> Save Note
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setEditing(true)}
                          style={{ marginTop: '1rem' }}
                        >
                          <FiEdit /> Add AI Note
                        </Button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2>{activeModal.data.name} Water Metrics</h2>
                  
                  <MetricItem>
                    <FiCloudRain />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Rainfall Impact</span>
                        <strong>{activeModal.data.rainfallImpact}%</strong>
                      </div>
                      <WaterLevel level={activeModal.data.rainfallImpact} />
                    </div>
                  </MetricItem>

                  <MetricItem>
                    <FiSun />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Soil Moisture</span>
                        <strong>{activeModal.data.soilMoisture}%</strong>
                      </div>
                      <WaterLevel level={activeModal.data.soilMoisture} />
                    </div>
                  </MetricItem>

                  <MetricItem>
                    <FiDatabase />
                    <div>
                      <h3>AI Recommendation</h3>
                      <p>Reduce watering frequency by 20% next week due to expected rainfall</p>
                    </div>
                  </MetricItem>
                </>
              )}

              <Button 
                onClick={() => {
                  setActiveModal(null);
                  setEditing(false);
                }}
                style={{ marginTop: '1.5rem' }}
              >
                Close
              </Button>
            </Modal>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;