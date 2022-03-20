
const Rank = () => {
    return (
        <>
        <div className="rank-chart">
            <div className="rank-chart-title">
                <ion-icon name="podium"></ion-icon>
                <h5>Bản xếp hạng</h5>
            </div>
            <ul>
                <li>
                    <div className="rank-item">
                        <div className="rank-item-user">
                            <img className="cup-item" src="/Ranks/gold.png"></img>
                            <img src="/user/default-avatar.png"></img>
                            <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="rank-item-mark">
                            <span>10000 </span>
                            <ion-icon class="icon" name="star"></ion-icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="rank-item">
                        <div className="rank-item-user">
                            <img className="cup-item" src="/Ranks/silver.png"></img>
                            <img src="/user/default-avatar.png"></img>
                            <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="rank-item-mark">
                            <span>10000 </span>
                            <ion-icon class="icon" name="star"></ion-icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="rank-item">
                        <div className="rank-item-user">
                            <img className="cup-item" src="/Ranks/bronze.png"></img>
                            <img src="/user/default-avatar.png"></img>
                            <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="rank-item-mark">
                            <span>10000 </span>
                            <ion-icon class="icon" name="star"></ion-icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="rank-item">
                        <div className="rank-item-user">
                            <img className="cup-item" src="/Ranks/rank_kk.png"></img>
                            <img src="/user/default-avatar.png"></img>
                            <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="rank-item-mark">
                            <span>10000 </span>
                            <ion-icon class="icon" name="star"></ion-icon>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="rank-item">
                        <div className="rank-item-user">
                            <img className="cup-item" src="/Ranks/rank_kk.png"></img>
                            <img src="/user/default-avatar.png"></img>
                            <span>Truong Ngoc Trong</span>
                        </div>
                        <div className="rank-item-mark">
                            <span>10000 </span>
                            <ion-icon class="icon" name="star"></ion-icon>
                        </div>
                    </div>
                </li>
            </ul>
        </div> 
        </>
    )
}
export default Rank
