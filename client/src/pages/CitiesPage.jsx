import {CitiesMap} from '../components/CitiesMap'
import {CountieChart} from '../components/CountieChart';
import {PieChartSales} from '../components/PieChartSales';

export function CitiesPage() {
    return (
        <main>
            <h1>Cities Page</h1>
            <div>
                <CitiesMap />
            </div>
            <div>
                <CountieChart />
            </div>
            <div>
                <PieChartSales />
            </div>
        </main>
    );
}