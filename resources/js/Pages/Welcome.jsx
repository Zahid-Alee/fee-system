import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <header class="main_menu home_menu">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12">
                            <nav class="navbar navbar-expand-lg navbar-light">
                                <a class="navbar-brand" href="/"> <img src="img/logo.png" alt="logo" /> </a>
                                <button class="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>

                                <div class=" navbar-collapse main-menu-item justify-content-end"
                                    id="navbarSupportedContent">
                                    <ul class="navbar-nav align-items-center">
                                        <li class="nav-item active">
                                            <a class="nav-link" href="/">Home</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="/about">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="/contact">Contact</a>
                                        </li>
                                        <li class="d-none d-lg-block">
                                            {auth.user ?
                                                <a class="btn_1" href="/dashboard/home">Dashboard</a>
                                                :
                                                <a class="btn_1" href="/login">Login</a>

                                            }
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            ]
            <section class="banner_part">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-xl-6">
                            <div class="banner_text">
                                <div class="banner_text_iner">
                                    <h5>Pay Fee Online Securely</h5>
                                    <h1>Seamless Fee Management System</h1>
                                    <p>Effortlessly pay fees online, print vouchers, and receive automated notifications for scholarships and transactions. Streamline your payment process with ease and efficiency.</p>
                                    <a href="/dashboard" class="btn_1">View Fee </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="feature_part">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-xl-3 align-self-center">
                            <div class="single_feature_text">
                                <h2>Outstanding <br /> Features</h2>
                                <p>Experience seamless fee management with automated payments, notifications, and easy voucher printing. Simplify your financial processes effortlessly.</p>
                                <a href="/about" class="btn_1">Read More</a>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xl-3">
                            <div class="single_feature">
                                <div class="single_feature_part">
                                    <span class="single_feature_icon"><i class="ti-credit-card"></i></span>
                                    <h4>Online Fee Payments</h4>
                                    <p>Pay your fees online securely and conveniently from anywhere at any time.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xl-3">
                            <div class="single_feature">
                                <div class="single_feature_part">
                                    <span class="single_feature_icon"><i class="ti-receipt"></i></span>
                                    <h4>Printable Vouchers</h4>
                                    <p>Easily print fee vouchers for your records and submissions with just a click.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xl-3">
                            <div class="single_feature">
                                <div class="single_feature_part single_feature_part_2">
                                    <span class="single_service_icon style_icon"><i class="ti-bell"></i></span>
                                    <h4>Email Notifications</h4>
                                    <p>Receive timely email notifications for fee reminders, payments, and transactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section class="learning_part">
                <div class="container">
                    <div class="row align-items-sm-center align-items-lg-stretch">
                        <div class="col-md-7 col-lg-7">
                            <div class="learning_img">
                                <img src="img/learning_img.png" alt="" />
                            </div>
                        </div>
                        <div class="col-md-5 col-lg-5">
                            <div class="learning_member_text">
                                <h5>About Us</h5>
                                <h2>Efficient Fee Management
                                    with Ease</h2>
                                <p>Our platform streamlines the fee payment process, offering automated payments, easy voucher printing, and timely notifications to ensure a hassle-free experience for students and administrators alike.</p>
                                <ul>
                                    <li><span class="ti-credit-card"></span>Secure online fee payments from anywhere.</li>
                                    <li><span class="ti-receipt"></span>Printable vouchers for record-keeping and submissions.</li>
                                    <li><span class="ti-bell"></span>Automated email notifications for reminders and transactions.</li>
                                </ul>
                                <a href="/about" class="btn_1">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section class="member_counter">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="single_member_counter">
                                <span class="counter">1500</span>
                                <h4>Total Students</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="single_member_counter">
                                <span class="counter">1200</span>
                                <h4>Fees Paid Online</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="single_member_counter">
                                <span class="counter">300</span>
                                <h4>Scholarships Granted</h4>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="single_member_counter">
                                <span class="counter">5000</span>
                                <h4>Email Notifications Sent</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="advance_feature learning_part">
                <div class="container">
                    <div class="row align-items-sm-center align-items-xl-stretch">
                        <div class="col-md-6 col-lg-6">
                            <div class="learning_member_text">
                                <h5>Advanced Features</h5>
                                <h2>Our Advanced Fee
                                    Management System</h2>
                                <p>Experience the next level of fee management with our advanced system. Automate payments, print vouchers effortlessly, and stay updated with real-time notifications.</p>
                                <div class="row">
                                    <div class="col-sm-6 col-md-12 col-lg-6">
                                        <div class="learning_member_text_iner">
                                            <span class="ti-credit-card"></span>
                                            <h4>Automated Payments</h4>
                                            <p>Simplify your fee payment process with automated transactions and seamless integration.</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-12 col-lg-6">
                                        <div class="learning_member_text_iner">
                                            <span class="ti-receipt"></span>
                                            <h4>Easy Voucher Printing</h4>
                                            <p>Generate and print fee vouchers easily, saving time and reducing errors.</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-12 col-lg-6">
                                        <div class="learning_member_text_iner">
                                            <span class="ti-bell"></span>
                                            <h4>Real-time Notifications</h4>
                                            <p>Stay informed with instant email notifications for payments, scholarships, and more.</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-md-12 col-lg-6">
                                        <div class="learning_member_text_iner">
                                            <span class="ti-lock"></span>
                                            <h4>Secure Transactions</h4>
                                            <p>Ensure the safety and security of all your transactions with our robust system.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="learning_img">
                                <img src="img/advance_feature_img.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer-area">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <div class="single-footer-widget footer_1">
                                <a href="/"> <img src="img/logo.png" alt="Logo" /> </a>
                                <p>Streamline your fee payments with our efficient and secure platform. Manage your finances effortlessly and stay updated with real-time notifications.</p>
                            </div>
                        </div>
                        {/* <div class="col-sm-6 col-md-4 col-xl-4">
                            <div class="single-footer-widget footer_2">
                                <h4>Newsletter</h4>
                                <p>Stay updated with our latest features and updates. Subscribe to our newsletter.</p>
                                <form action="#">
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input type="email" class="form-control" placeholder='Enter email address'
                                                onfocus="this.placeholder = ''"
                                                onblur="this.placeholder = 'Enter email address'" />
                                            <div class="input-group-append">
                                                <button class="btn btn_1" type="button"><i class="ti-angle-right"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="social_icon">
                                    <a href="#"> <i class="ti-facebook"></i> </a>
                                    <a href="#"> <i class="ti-twitter-alt"></i> </a>
                                    <a href="#"> <i class="ti-instagram"></i> </a>
                                    <a href="#"> <i class="ti-skype"></i> </a>
                                </div>
                            </div>
                        </div> */}
                        <div class="col-xl-3 col-sm-6 col-md-4">
                            <div class="single-footer-widget footer_2">
                                <h4>Contact Us</h4>
                                <div class="contact_info">
                                    <p><span> Address :</span>COMSATS UNIVERSITY ISLAMABAD, VEHARI </p>
                                    <p><span> Phone :</span>03266986354</p>
                                    <a href="mailto:mudassargujjar136@gmail.com">
                                        <p><span> Email : </span>mudassargujjar136@gmail.com</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    );
}
