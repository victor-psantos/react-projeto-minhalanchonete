import { Link } from "react-router-dom"
import "./Menu.css"

export default function Menu(){
    return (
        <div className="Menu">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/sanduichs">Sanduiches</Link></li>
                    <li><Link to="/drinks">Bebidas</Link></li>
                    <li><Link to="/portions">Porções</Link></li>
                    <li><Link to="/cart">Carrinho</Link></li>
                </ul>
            </nav>
        </div>
    )
}