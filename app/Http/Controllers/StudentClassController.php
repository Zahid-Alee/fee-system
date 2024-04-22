<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use Illuminate\Http\Request;

class StudentClassController extends Controller
{
    public function index()
    {
        $studentClasses = StudentClass::all();
        return [
            "classes" => $studentClasses,
            "success" => true,
        ];
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $studentClass = new StudentClass();
        $studentClass->title = $request->input('title');
        $studentClass->description = $request->input('description');
        $studentClass->save();

        return [
            "classes" => $studentClass,
            "success" => true,
        ];    
    }


    public function update(Request $request)
    {
        $request->validate([
            'id'=>['required','integer'],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $title = $request->input('title');
        $description = $request->input('description');

        $studentClass = StudentClass::find($request->input('id'));
        $studentClass->title = $title;
        $studentClass->description = $description;
        $studentClass->save();

        return [
            "classes" => $studentClass,
            "success" => true,
        ];    }

    public function destroy(Request $request)
    {

        $id = $request->input('id');
        StudentClass::destroy($id);
        return [
            "success" => true,
        ];
    }}
