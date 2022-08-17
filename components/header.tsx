import React from 'react'

type Props = {
    icon: string
    image: string
}

const Header: React.FC<Props> = ({ icon, image, children }) => {
  return (
      <>
        <header className="header">
          <div className="header-inner">
            <div className="icon">
              {icon}
            </div>
            <h1 className="title">
              {children}
            </h1>
          </div>
        </header>
        <style jsx>{`
          .title {
            padding: 0;
            margin: 0;
            font-size: 2.2rem;
          }
          .header {
            width: 100%;
            height: 434px;
            margin: 0 0 160px;
            position: relative;
            background-size: cover;
            background-image: url("${image}");
            background-position: left 40%;
            background-repeat: no-repeat;
            background-color: #eee;
          }
          .header-inner {
            font-size: 1rem;
            max-width: 1000px;
            margin: 0 auto;
            padding: 378px 1.5rem 0;
          }
          .icon {
            font-size: 4rem;
          }
        `}</style>
      </>
    )
}

export default Header