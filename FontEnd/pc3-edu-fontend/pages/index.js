import Head from 'next/head'
import Image from 'next/image'
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
    <Head>
      <>
        <title>Trang chủ</title>
        {/* add img in title bar */}
        <link rel="shortcut icon" href="https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.18172-8/22382352_1885071128422367_293877343415302519_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=p8hyhQioNJYAX_N4WRD&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8Nce2WFC4rdY9GU_9mGu6jZP6nDlNWg9e25g9Rx-y6hw&oe=62432F21"></link>
      </>
    </Head>
    <div className={styles.home_wrapper}>
        <div className={styles.banner_wrapper}>
          <div className={styles.banner}>
            <div className={styles.slides}>
              {/* radio button start */}
                <input type="radio" name='radio-btn' className={styles.r} id='radio1'></input>
                <input type="radio" name='radio-btn' className={styles.r} id='radio2'></input>
                <input type="radio" name='radio-btn' className={styles.r} id='radio3'></input>
                <input type="radio" name='radio-btn' className={styles.r} id='radio4'></input>
              {/* radio button end */}
               {/* image of slider start */}
                  <div className={styles.slide} id="s1">
                      <img src='https://minhduongads.com/wp-content/uploads/2019/03/truyen-thong-minh-duong.jpg'></img>
                  </div>
                  <div className={styles.slide} id="s2">
                    <img src='https://minhduongads.com/wp-content/uploads/2019/03/truyen-thong-minh-duong.jpg'></img>
                  </div>
                  <div className={styles.slide} id="s3">
                    <img src='https://minhduongads.com/wp-content/uploads/2019/03/truyen-thong-minh-duong.jpg'></img>
                  </div>
                  <div className={styles.slide} id="s4">
                    <img src='https://minhduongads.com/wp-content/uploads/2019/03/truyen-thong-minh-duong.jpg'></img>
                  </div>
                {/* image of slider end */}
                {/* navigation start */}
                <div className={styles.navigation}>
                  <label htmlFor='radio1' className={styles.bar} ></label>
                  <label htmlFor='radio2' className={styles.bar} ></label>
                  <label htmlFor='radio3' className={styles.bar} ></label>
                  <label htmlFor='radio4' className={styles.bar} ></label>
                </div>
                {/* navigation end */}
            </div>
          </div>

        </div>
        <div className={styles.content_wrapper}>
            <div className={styles.content}>
              this is content
              
            </div>
            <div className={styles.sidebar_right}>
              sidebar right
            </div>
        </div>
    </div>
    </>
   
  )
}
