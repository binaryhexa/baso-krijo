import { useEffect, useState } from "react";
import HeaderCard from "./components/HeaderCard";
import PieChartDashboard from "./components/PieChartDashboard";
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

const Home = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);  
  const [loading, setLoading] = useState(true);    
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await axios.get('http://basokrijo.infinityfreeapp.com/connection.php');
        setMenu(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setError("Failed to load menu data");  
        setLoading(false);  
      }
    };

    loadMenu();  
  }, []);  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Rekap Aktivitas</h1>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image_url} alt={item.name} className="w-24 h-24" />
          </li>
        ))}
      </ul>
      <HeaderCard />
      <PieChartDashboard />
    </div>
  );
};

export default Home;
