@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="panel-body">
            @include('common.errors')
            <form action="/task" method="POST" class="form-horizontal">
                {{ csrf_field() }}

                <div class="form-group">
                    <label for="task" class="col-sm-3 control-label"><strong>Task</strong></label>
                    <div class="d-flex">
                        <div class="col-sm-6">
                            <input type="text" name="name" id="task-name" class="form-control">
                        </div>
                        <div class="col-sm-offset-3 col-sm-6">
                            <button type="submit" class="btn btn-primary">
                                <i class="fa fa-plus"></i> Add Task
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <hr>
            <br>
        </div>

        @if (count($tasks) > 0)
            <div class="panel panel-default">
                <div class="panel-heading"><strong>Laravel-Crud TaskList</strong></div>
                <div class="panel-body">
                    <table class="table table-striped task-table">

                        <thead>
                            <th>Task</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </thead>

                        <tbody>
                            @foreach ($tasks as $task)
                                <tr>

                                    <td class="table-text">
                                        <div>{{ $task->name }}</div>
                                    </td>

                                    <td>
                                        <form action="/task/{{ $task->id }}" method="POST">
                                            {{ csrf_field() }}
                                            {{ method_field('DELETE') }}

                                            <button class="btn btn-danger" onclick="return confirm('Are you sure you want to delete {{ $task->name }}?')">
                                                <i class="fa-solid fa-trash"></i> Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>

                    </table>
                </div>
            </div>
        @endif
    </div>

    <style>
        /* Add custom CSS styles */
        .panel-heading {
            background-color: lightskyblue; /* Gray background color */
            color: #ffff; /* White text color */
            padding: 10px;
            font-size: 30px;
        }

        td:last-child {
            text-align: right;
        }

    </style>
@endsection
