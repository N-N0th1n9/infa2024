import Layout from '../components/containers/Layout'

function HomePage() {
  return (
    <Layout>
      <div>
        <div className='mb-7'>
          <h2>About this project</h2>
          <p>
            This project is made for the defense of laboratory works on subjects:{' '}
            <span className='text-mainRed'>"Управление данными"</span> и{' '}
            <span className='text-mainRed'>
              "Технология программирования: специальные главы"
            </span>
            .
          </p>
        </div>
        <div>
          <h2>Statistics</h2>
          <div className='flex flex-col gap-3'>
            <span>
              Number of customers: <span className='text-mainRed'>5</span>
            </span>
            <span>
              Number of projects: <span className='text-mainRed'>5</span>
            </span>
            <span>
              Number of employees: <span className='text-mainRed'>5</span>
            </span>
            <span>
              Number of teams: <span className='text-mainRed'>5</span>
            </span>
            <span>
              Number of tasks: <span className='text-mainRed'>5</span>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
