function Services() {
    return (
        <div>
            <section className="discount">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="discount__pic">
                                <img src="/ashion-master/img/discount.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="discount__text">
                                <div className="discount__text__title">
                                    <span>Discount</span>
                                    <h2>Summer 2019</h2>
                                    <h5><span>Sale</span> 50%</h5>
                                </div>
                                <div className="discount__countdown" id="countdown-time">
                                    <div className="countdown__item">
                                        <span>22</span>
                                        <p>Days</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>18</span>
                                        <p>Hour</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>46</span>
                                        <p>Min</p>
                                    </div>
                                    <div className="countdown__item">
                                        <span>05</span>
                                        <p>Sec</p>
                                    </div>
                                </div>
                                <a href="#">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>Free Shipping</h6>
                                <p>For all oder over $99</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>Money Back Guarantee</h6>
                                <p>If good have Problems</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>Online Support 24/7</h6>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>Payment Secure</h6>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;