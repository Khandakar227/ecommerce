import DisplayPhoto from "./DisplayPhoto"
import ProfileInfo from "./ProfileInfo"
import SecurityInfo from "./SecurityInfo"

function Profile() {
  return (
    <section className="grid mx-auto max-w-5xl justify-center gap-4 md:grid-cols-2">
        <div className="my-4">
            <ProfileInfo />
            <SecurityInfo />
        </div>
        <div className="area-1 md:area-auto my-4">
            <DisplayPhoto />
        </div>
    </section>
  )
}

export default Profile