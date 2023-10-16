import {CitiesMap} from '../components/CitiesMap'
import {CountieChart} from '../components/CountieChart';
import {PieChartSales} from '../components/PieChartSales';
import {MultieBarChart} from '../components/MultieBarChart';
import '../styles/tooplate.css'


export function CitiesPage() {
    return (
        <main>
        <div>
            <a className="navbar-brand">
                <h1 className="tm-site-title">Housing Prices United States DATA</h1>
            </a>
        </div>
            <div className="grid-container">
                <div className="grid-item item1">
                    <CitiesMap />
                </div>
                <div className="grid-item">
                    <CountieChart />
                </div>
                <div className="grid-item">
                    <PieChartSales/>
                </div>
                <div className="grid-item item1">
                    <MultieBarChart/>
                </div>
            </div>
            <footer>&copy; 2023 - Todos los derechos reservados</footer>
    </main>
    );
}