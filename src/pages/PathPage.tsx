import { pathDataset } from '../data/path/path'
import { BeforeRecord } from '../components/path/BeforeRecord'
import { PathHero } from '../components/path/PathHero'
import { PathNavigation } from '../components/path/PathNavigation'
import { PathRecord } from '../components/path/PathRecord'
import { Footer } from '../components/Footer'

export function PathPage() {
  return (
    <>
      <PathNavigation />
      <main>
        <PathHero />
        <BeforeRecord beforeRecord={pathDataset.beforeRecord} />
        <PathRecord eras={pathDataset.eras} />
      </main>
      <Footer />
    </>
  )
}
