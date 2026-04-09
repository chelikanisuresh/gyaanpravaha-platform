'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Child {
  id: string
  full_name: string
  email: string
}

export function useChildren() {
  const [children, setChildren]   = useState<Child[]>([])
  const [parentName, setParentName] = useState('Parent')
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      // Parent name
      const { data: p } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
      if (p?.full_name) setParentName(p.full_name)

      // All children linked to this parent
      const { data: links } = await supabase
        .from('parent_student_links')
        .select('student_id')
        .eq('parent_id', user.id)

      if (!links || links.length === 0) { setLoading(false); return }

      const ids = links.map(l => l.student_id)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', ids)

      if (profiles) setChildren(profiles as Child[])
      setLoading(false)
    }
    load()
  }, [])

  return { children, parentName, loading }
}
