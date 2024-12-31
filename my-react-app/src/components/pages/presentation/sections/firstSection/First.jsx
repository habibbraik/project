import img from '../../../../../../public/images/why.jpg'
import "./first.css"

const First = () => {
  return (
    <div className="main-class-first-presentation">
        <div className="content-main-class-presentation">
            <div className="content-para-presentation-first">
                <h1>pourquoi first ifrest?</h1>
                <p>
                    Parce qu'elle offrait des programmes innovants sous la supervision d'experts passionnés, 
                    avec des services diversifiés qui répondent aux besoins des gens. 
                    Comprend une flexibilité personnalisée pour des résultats 
                    tangibles et des performances musicales  qui font sortir l'eau de l'eau.
                </p>
            </div>
            <div className="img-first-presentation">
                <img src={img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default First