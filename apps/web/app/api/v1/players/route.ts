import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const position = searchParams.get('position')
    const governorate = searchParams.get('governorate')
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    const players = [
      {
        id: '1',
        name: 'أحمد محمد',
        position: 'مهاجم',
        age: 17,
        governorate: 'القاهرة',
        rating: 8.5,
        academy: 'أكاديمية النصر',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'محمد علي',
        position: 'مدافع',
        age: 16,
        governorate: 'الإسكندرية',
        rating: 7.8,
        academy: 'أكاديمية الاتحاد',
        createdAt: '2024-01-20'
      }
    ]

    return NextResponse.json({
      success: true,
      data: players,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: players.length
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch players' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newPlayer = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: newPlayer,
      message: 'Player created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create player' },
      { status: 500 }
    )
  }
}
