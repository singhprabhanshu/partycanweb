
import React from 'react';
import { connect } from 'react-redux';

class Faq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="row my-5">
                    <div className="col-md-12 mb-4"><h1>Privacy Policy</h1></div>
                    <div className="col-md-12" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                        <div>
                            <p>Where are we currently distributing (retail)?.</p>
                        </div>
                        <div><p>
                        Where are we currently distributing (retail)?    
Party Can is currently available in select retail stores in Colorado and Illinois, with plans to be in all major markets by September 2020. Please contact us to check availability in your area, or order now for delivery! https://drinkpartycan.com/category/Cans/product/86228
How long does it take to ship?

All orders placed before 4:00 pm CST (Monday-Friday) will be processed within 1-3 business days in addition to shipping. Ship times vary depending on your shipping location and delivery method. Please note that due to the global situation, delays are to be expected. Learn more at drinkpartycan.com!

Which states do you ship to?

	We currently work with retail partners to ship to all U.S. states except AK, AL, HI, OH, NC, and UT.

How can I check my order status?

You may check your order’s status in your Party Can account. Once your order has been shipped and processed, you will receive a confirmation email with tracking information. Please note that sometimes our emails may get filtered in your spam folder if we’re not in your contacts, so be sure to check there first.

My tracking number status is “pending”? 

Please note that the tracking number will become active up to 24 hours after you receive your confirmation email. If your tracking number remains in the pending status for more than 24 hours, please email us at hi@drinkpartycan.com.

What are the ingredients? 

100% all natural. We use a blend of highland tequila (100% blue weber agave ONLY), Combier Liqueur d'Orange, spices and real lime juice.

What is the shelf life of Party Can?  
  
Party Can has a shelf life of 6 months, even after opening. We recommend consuming it within one month however to get the best taste quality.  

Whoa, wait! This expired already!?!

Hey there! Don’t panic. This is the CAD date, which is the expiration date. It’s meant to be read as DD/MM/YYYY. 

Does shipping in the heat cause issues with quality/freshness?  

Nope! 

What are the spice notes?  

Ginger, Cinnamon, Chili 

Why is there caramel color? Isn’t it carcinogenic?

It’s a 100% natural color that is derived from corn.

Hmmm, most Ready-To-Drink cocktails are sugary and weak. What makes Party Can different? 

This cocktail was voted the #1 ready to drink margarita by ShakeStir.com, the world's largest community for bartenders and mixologists. We only use the most premium ingredients.

Won’t the ice melt by the time my party pack comes? Why spend $10 more to get a cooler and some cups? 

We sell the Party Pack (with or without ice) to local Chicago residents who are looking to have a quality cocktail on-the-go. Local deliveries are made within 30 mins or less so we can assure the ice arrives in time to enjoy! Our cardboard coolers and cups are compostable and reusable, so you can get multiple uses out of them! A win-win for all!

Do you distribute outside of Chicago? 

Unfortunately, we're only selling via drinkpartycan.com outside of the Chicago area, but stay tuned as we're expanding for wholesale nationwide! 

Are there any promo codes available?

We are regularly running exciting offers and promotions. Sign up to our newsletter to be in the know! 

                        </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Faq;