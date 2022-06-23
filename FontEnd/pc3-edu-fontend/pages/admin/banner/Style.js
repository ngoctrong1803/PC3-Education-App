import styled from "styled-components";
const Style = styled.div`
  .admin-banner-wrap {
    width: 100%;
    .admin-banner-header {
      padding: 25px 15px 0px 15px;
      display: flex;
      justify-content: space-between;
    }

    .banner-item-wrap {
      padding-top: 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .banner-item-title {
        width: 100%;
        padding: 0 30px 5px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 18px;
          font-weight: 700;
          color: #04539f;
        }
      }
      .banner-img {
        width: 95%;
        border-radius: 5px;
        border: solid 3px #04539f;
      }
      .banner-item-footer {
        width: 100%;
        padding: 0 30px 5px 30px;
        display: flex;
        align-items: center;
        justify-content: end;
        button {
          margin: 5px;
        }
      }
    }
  }
`;

export default Style;
