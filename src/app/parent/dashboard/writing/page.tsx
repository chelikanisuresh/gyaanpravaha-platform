'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'
import ChildTabs from '@/components/ChildTabs'

interface Child { id: string; full_name: string; email: string }

function WritingInner() {
  const searchParams                = useSearchParams()
  const [children, setChildren]     = useState<Child[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (!links?.length) return
      const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', links.map((l: any) => l.student_id))
      if (profiles?.length) {
        setChildren(profiles as Child[])
        setSelectedId(searchParams.get('child') || profiles[0].id)
      }
    }
    load()
  }, [searchParams])

  return (
    <ParentSidebarLayout parentName={parentName}>
      <div>
        {children.length > 1 && (
          <ChildTabs children={children} selectedId={selectedId} onSelect={setSelectedId}/>
        )}

        <div style={{ marginBottom:'28px' }}>
          <h1 style={{ fontFamily:'var(--font-heading)', fontWeight:900, fontSize:'24px', color:'#1B4332', marginBottom:'4px' }}>Writing Prompts</h1>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF' }}>Writing assignments set by the teacher — your child's submissions and scores appear here</p>
        </div>

        {/* Empty state */}
        <div style={{ background:'white', borderRadius:'16px', border:'1px solid #E5E7EB', padding:'64px 40px', textAlign:'center' }}>
          <div style={{ width:'72px', height:'72px', background:'#F0FDF4', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'32px' }}>
            ✍️
          </div>
          <p style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'20px', color:'#1B4332', marginBottom:'10px' }}>
            No writing prompts yet
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'#9CA3AF', maxWidth:'380px', margin:'0 auto', lineHeight:1.7 }}>
            Writing assignments will appear here once the teacher assigns them. When your child submits a response, you'll be able to see their work and score here.
          </p>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}

export default function WritingPage() {
  return <Suspense fallback={<div style={{ padding:'40px', fontFamily:'var(--font-body)', color:'#9CA3AF' }}>Loading...</div>}><WritingInner/></Suspense>
}
