import { useState, useEffect } from 'react';
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
  FiInfo,
  FiMapPin
} from 'react-icons/fi';

// Animation Hook
const useAnimation = (dependencies = []) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
    return () => setShouldAnimate(false);
  }, dependencies);

  return shouldAnimate;
};

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
  neutral: '#444546',
  background: '#f8fafc',
  text: '#1e293b',
  textLight: '#f8fafc'
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
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

const SectionDescription = styled.p`
  color: ${theme.neutral};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.2rem;
  margin-bottom: 3rem;
`;

const ItemCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 3rem;
`;

const ReservoirItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: #add6f1;
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
    transition: width 0.8s ease-out, background 0.3s ease;
    transform-origin: left center;
    animation: ${props => props.$animate ? 'waterRise 0.8s ease-out forwards' : 'none'};
  }

  @keyframes waterRise {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);

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

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
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
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [showLocationRequest, setShowLocationRequest] = useState(false);

  // Animation hooks
  const reservoirAnimate = useAnimation([inventory]);
  const modalAnimate = useAnimation([activeModal]);

  const fetchWeather = (lat, lon) => {
    const API_KEY = 'ced138e95fb39bb25536e058d5129da3';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Weather data not available');
        return response.json();
      })
      .then(data => {
        const weatherData = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
        };
        setWeather(weatherData);
      })
      .catch(error => {
        console.error(error);
        setWeatherError(error.message);
      });
  };

  useEffect(() => {
    const handleGeolocation = async () => {
      if (navigator.geolocation) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
          
          if (permissionStatus.state === 'granted') {
            getLocation();
          } else if (permissionStatus.state === 'prompt') {
            setShowLocationRequest(true);
          } else {
            setWeatherError('Please enable location access in browser settings for weather data');
          }
        } catch (error) {
          setShowLocationRequest(true);
        }
      } else {
        setWeatherError('Geolocation is not supported by this browser.');
      }
    };

    handleGeolocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
        setShowLocationRequest(false);
      },
      (error) => {
        setWeatherError('Location access denied - using default weather data');
        setShowLocationRequest(false);
      }
    );
  };

  const LocationPermissionModal = () => (
    <>
      <ModalBackdrop />
      <Modal>
        <div style={{ textAlign: 'center' }}>
          <FiMapPin size={48} color={theme.primary} style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Location Access Request</h2>
          <p style={{ marginBottom: '2rem', lineHeight: 1.5 }}>
            To provide accurate weather forecasts and farming recommendations, 
            we need access to your location. Your data remains completely private 
            and is never shared with third parties.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button
              onClick={getLocation}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              <FiMapPin /> Allow Location
            </Button>
            <Button
              onClick={() => {
                setWeatherError('Using default location - enable location for accurate data');
                setShowLocationRequest(false);
              }}
              style={{ 
                background: theme.danger,
                padding: '1rem 2rem',
                fontSize: '1.1rem'
              }}
            >
              Continue Without
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );

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
        {showLocationRequest && <LocationPermissionModal />}

        <Header>
          <h1><FiDroplet /> KarooFarmer</h1>
        </Header>

        <ReservoirList style={{ marginBottom: '2rem' }}>
          <MetricItem>
            <FiCloudRain size={24} />
            <div>
              <h3>Current Weather</h3>
              {weather ? (
                <p>{weather.condition} ({weather.description}) | {weather.temp}°C</p>
              ) : weatherError ? (
                <p>Error: {weatherError}</p>
              ) : (
                <p>Loading weather...</p>
              )}
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

        {/* Crop Inventory Section */}
        <div>
          <h2 style={{ color: theme.primary, marginBottom: '0.5rem' }}>Crop Inventory</h2>
          <SectionDescription>
            Manage your farm's crop portfolio. View current crops, their water requirements,
            and detailed metrics. Click any crop to edit details or add notes for AI analysis.
          </SectionDescription>
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
        </div>

        {/* Water Management Section */}
        <div>
          <h2 style={{ color: theme.primary, marginBottom: '0.5rem' }}>Water Management</h2>
          <SectionDescription>
            Monitor and optimize your water usage. View current reservoir levels,
            soil moisture, and rainfall impact. Click any item for detailed water metrics
            and personalized irrigation recommendations.
          </SectionDescription>
          <ReservoirList>
            {inventory.map(crop => {
              const animate = useAnimation([crop.id]);
              return (
                <ReservoirItem key={crop.id} onClick={() => setActiveModal({ type: 'reservoir', data: crop })}>
                  <div>{crop.name}</div>
                  <WaterLevel 
                    level={(crop.currentWater / 50) * 100} 
                    alert={crop.currentWater < 20}
                    $animate={animate}
                  />
                  <div>{crop.currentWater}L remaining</div>
                </ReservoirItem>
              );
            })}
          </ReservoirList>
        </div>

        {activeModal && (
          <>
            <ModalBackdrop onClick={() => {
              setActiveModal(null);
              setEditing(false);
            }} />
            <Modal>
              {activeModal.type === 'crop' ? (
                <>
                  <h2>{activeModal.data?.name || 'Preview mode. Feature not yet available.'}</h2>                  
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
                          <WaterLevel 
                            level={(activeModal.data.currentWater / 50) * 100} 
                            $animate={modalAnimate}
                          />
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
                        <>
                          <textarea
                            value={aiNote}
                            onChange={(e) => setAiNote(e.target.value)}
                            placeholder="Add notes for AI (e.g., 'Leaves wilting since Tuesday')"
                            style={{ 
                              width: '100%', 
                              minHeight: '100px', 
                              padding: '0.5rem',
                              marginTop: '1rem',
                              borderRadius: '8px',
                              border: `1px solid ${theme.neutral}`
                            }}
                          />
                          <ModalActions>
                            <Button 
                              onClick={() => {
                                setEditing(false);
                                setAiNote('');
                              }}
                              style={{ background: theme.danger }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={() => handleSaveNote(activeModal.data?.id)}
                            >
                              <FiSave /> Save Note
                            </Button>
                          </ModalActions>
                        </>
                      ) : (
                        <ModalActions>
                          <Button 
                            onClick={() => setEditing(true)}
                          >
                            <FiEdit /> Add AI Note
                          </Button>
                          <Button 
                            onClick={() => {
                              setActiveModal(null);
                              setEditing(false);
                            }}
                          >
                            Close
                          </Button>
                        </ModalActions>
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
                      <WaterLevel 
                        level={activeModal.data.rainfallImpact} 
                        $animate={modalAnimate}
                      />
                    </div>
                  </MetricItem>

                  <MetricItem>
                    <FiSun />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Soil Moisture</span>
                        <strong>{activeModal.data.soilMoisture}%</strong>
                      </div>
                      <WaterLevel 
                        level={activeModal.data.soilMoisture} 
                        $animate={modalAnimate}
                      />
                    </div>
                  </MetricItem>

                  <MetricItem>
                    <FiDatabase />
                    <div>
                      <h3>AI Recommendation</h3>
                      <p>Reduce watering frequency by 20% next week due to expected rainfall</p>
                    </div>
                  </MetricItem>

                  <ModalActions>
                    <Button 
                      onClick={() => {
                        setActiveModal(null);
                        setEditing(false);
                      }}
                      style={{ marginLeft: 'auto' }}
                    >
                      Close
                    </Button>
                  </ModalActions>
                </>
              )}
            </Modal>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;